// src/models/product.model.ts
import { query } from "../config/db.js";

export const ProductModel = {
  findAll: async () => {
    const { rows } = await query("SELECT * FROM products ORDER BY id ASC");
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