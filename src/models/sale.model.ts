// src/models/sale.model.ts
import { query } from "../config/db.js";

export const SaleModel = {
  findAll: async () => {
    const { rows } = await query(
      `SELECT s.*, c.nombre AS cliente
       FROM sales s
       JOIN customers c ON s.customers_id = c.id
       ORDER BY s.id ASC`
    );
    return rows;
  },

  findById: async (id: number | string) => {
    const { rows } = await query(
      `SELECT s.*, c.nombre AS cliente
       FROM sales s
       JOIN customers c ON s.customers_id = c.id
       WHERE s.id = $1`, [id]
    );
    return rows[0] || null;
  },

  create: async (customers_id: number, fecha: any, total: number) => {
    const { rows } = await query(
      "INSERT INTO sales (customers_id, fecha, total) VALUES ($1, $2, $3) RETURNING *",
      [customers_id, fecha || new Date(), total]
    );
    return rows[0];
  },

  update: async (id: number | string, customers_id: number, fecha: any, total: number) => {
    const { rows } = await query(
      "UPDATE sales SET customers_id = $1, fecha = $2, total = $3 WHERE id = $4 RETURNING *",
      [customers_id, fecha, total, id]
    );
    return rows[0] || null;
  },

  delete: async (id: number | string) => {
    const { rows } = await query("DELETE FROM sales WHERE id = $1 RETURNING *", [id]);
    return rows[0] || null;
  },
};   