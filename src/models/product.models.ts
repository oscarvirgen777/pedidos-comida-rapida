import { query, pool } from "../config/db.js";

export const ProductModel = {
  findAll: async (maxPrice?: number, page?: number, limit?: number) => {
    let sql = "SELECT * FROM products";
    const params: (string | number)[] = [];

    if (maxPrice !== undefined) {
      params.push(maxPrice);
      sql += ` WHERE precio <= $${params.length}`;
    }

    sql += " ORDER BY id ASC";

    const lim = limit ?? 10;
    const offset = ((page ?? 1) - 1) * lim;
    params.push(lim, offset);
    sql += ` LIMIT $${params.length - 1} OFFSET $${params.length}`;

    const { rows } = await query(sql, params);
    return rows;
  },

  findById: async (id: number | string) => {
    const { rows } = await query("SELECT * FROM products WHERE id = $1", [id]);
    return rows[0] || null;
  },

  create: async (nombre: string, detalles: string, precio: number) => {
    const { rows } = await query(
      "INSERT INTO products (nombre, detalles, precio) VALUES ($1, $2, $3) RETURNING *",
      [nombre, detalles || null, precio]
    );
    return rows[0];
  },

  update: async (id: number | string, nombre: string, detalles: string, precio: number) => {
    const { rows } = await query(
      "UPDATE products SET nombre = $1, detalles = $2, precio = $3 WHERE id = $4 RETURNING *",
      [nombre, detalles, precio, id]
    );
    return rows[0] || null;
  },

  delete: async (id: number | string) => {
    const { rows } = await query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);
    return rows[0] || null;
  },
};   