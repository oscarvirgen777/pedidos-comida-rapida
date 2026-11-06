import { pool } from "../config/db.js";

export async function getAllSales() {
  const { rows } = await pool.query(
    `SELECT s.*, c.name AS customer_name
     FROM sales s
     INNER JOIN customers c ON s.customer_id = c.id
     ORDER BY s.created_at DESC`
  );
  return rows;
}

export async function getSaleById(id: number) {
  const { rows } = await pool.query(
    `SELECT s.*, c.name AS customer_name
     FROM sales s
     INNER JOIN customers c ON s.customer_id = c.id
     WHERE s.id = $1`,
    [id]
  );
  return rows[0] ?? null;
}

interface SaleItem {
  product_id: number;
  quantity: number;
  unit_price: number;
}

export async function createSaleWithItems(
  customerId: number,
  items: SaleItem[]
) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const total = items.reduce((s, i) => s + i.quantity * i.unit_price, 0);
    const { rows: saleRows } = await client.query(
      `INSERT INTO sales (customer_id, total) VALUES ($1, $2) RETURNING id`,
      [customerId, total]
    );
    const saleId = saleRows[0].id;

    for (const item of items) {
      await client.query(
        `INSERT INTO sale_details (sale_id, product_id, quantity, unit_price)
         VALUES ($1, $2, $3, $4)`,
        [saleId, item.product_id, item.quantity, item.unit_price]
      );
    }

    await client.query("COMMIT");

    const { rows } = await client.query(
      `SELECT s.*, c.name AS customer_name
       FROM sales s INNER JOIN customers c ON s.customer_id = c.id
       WHERE s.id = $1`,
      [saleId]
    );
    const { rows: detailRows } = await client.query(
      `SELECT * FROM sale_details WHERE sale_id = $1`,
      [saleId]
    );

    return { sale: rows[0], items: detailRows };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}   