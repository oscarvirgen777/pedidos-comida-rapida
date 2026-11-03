// src/models/sale_detail.model.ts
import { query } from "../config/db.js";

export const SaleDetailModel = {
  findAll: async () => {
    const { rows } = await query(
      `SELECT sd.*, p.nombre AS producto
       FROM sale_details sd
       JOIN products p ON sd.product_id = p.id
       ORDER BY sd.id ASC`
    );
    return rows;
  },

  findById: async (id: number | string) => {
    const { rows } = await query(
      `SELECT sd.*, p.nombre AS producto
       FROM sale_details sd
       JOIN products p ON sd.product_id = p.id
       WHERE sd.id = $1`, [id]
    );
    return rows[0] || null;
  },

  findBySale: async (sale_id: number | string) => {
    const { rows } = await query(
      `SELECT sd.*, p.nombre AS producto
       FROM sale_details sd
       JOIN products p ON sd.product_id = p.id
       WHERE sd.sale_id = $1`, [sale_id]
    );
    return rows;
  },

  create: async (sale_id: number, product_id: number, cantidad: number, precio_unit: number) => {
    const { rows } = await query(
      "INSERT INTO sale_details (sale_id, product_id, cantidad, precio_unit) VALUES ($1, $2, $3, $4) RETURNING *",
      [sale_id, product_id, cantidad, precio_unit]
    );
    return rows[0];
  },

  update: async (id: number | string, sale_id: number, product_id: number, cantidad: number, precio_unit: number) => {
    const { rows } = await query(
      "UPDATE sale_details SET sale_id = $1, product_id = $2, cantidad = $3, precio_unit = $4 WHERE id = $5 RETURNING *",
      [sale_id, product_id, cantidad, precio_unit, id]
    );
    return rows[0] || null;
  },

  delete: async (id: number | string) => {
    const { rows } = await query("DELETE FROM sale_details WHERE id = $1 RETURNING *", [id]);
    return rows[0] || null;
  },
};   