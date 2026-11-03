// src/models/customer.model.ts
import { query } from "../config/db.js";

export const CustomerModel = {
  findAll: async () => {
    const { rows } = await query("SELECT * FROM customers ORDER BY id ASC");
    return rows;
  },

  findById: async (id: number | string) => {
    const { rows } = await query("SELECT * FROM customers WHERE id = $1", [id]);
    return rows[0] || null;
  },

  create: async (nombre: string, correo: string, telefono: string) => {
    const { rows } = await query(
      "INSERT INTO customers (nombre, correo, telefono) VALUES ($1, $2, $3) RETURNING *",
      [nombre, correo, telefono || null]
    );
    return rows[0];
  },

  update: async (id: number | string, nombre: string, correo: string, telefono: string) => {
    const { rows } = await query(
      "UPDATE customers SET nombre = $1, correo = $2, telefono = $3 WHERE id = $4 RETURNING *",
      [nombre, correo, telefono, id]
    );
    return rows[0] || null;
  },

  delete: async (id: number | string) => {
    const { rows } = await query("DELETE FROM customers WHERE id = $1 RETURNING *", [id]);
    return rows[0] || null;
  },
};   