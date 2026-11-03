// src/controllers/sale.controller.ts
import type { Request, Response } from "express";

import { SaleModel } from "../models/sale.model.js";
import { SaleDetailModel } from "../models/sale_detail.model.js";

/*#swagger.tags = ['Sales']
  #swagger.summary = 'Listar todas las ventas' */
export const getSales = async (req: Request, res: Response) => {
  try {
    const sales = await SaleModel.findAll();
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/*#swagger.tags = ['Sales']
  #swagger.summary = 'Obtener una venta por ID (con detalles)' */
export const getSale = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const sale = await SaleModel.findById(id);
    if (!sale) return res.status(404).json({ error: "Venta no encontrada" });
    const details = await SaleDetailModel.findBySale(id);
    res.json({ ...sale, details });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/*#swagger.tags = ['Sales']
  #swagger.summary = 'Crear una nueva venta' */
export const createSale = async (req: Request, res: Response) => {
  try {
    const { customers_id, fecha, total } = req.body;
    const sale = await SaleModel.create(customers_id, fecha, total);
    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/*#swagger.tags = ['Sales']
  #swagger.summary = 'Actualizar una venta' */
export const updateSale = async (req: Request, res: Response) => {
  try {
    const { customers_id, fecha, total } = req.body;
    const id = req.params.id as string;
    const sale = await SaleModel.update(id, customers_id, fecha, total);
    if (!sale) return res.status(404).json({ error: "Venta no encontrada" });
    res.json(sale);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/*#swagger.tags = ['Sales']
  #swagger.summary = 'Eliminar una venta' */
export const deleteSale = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const sale = await SaleModel.delete(id);
    if (!sale) return res.status(404).json({ error: "Venta no encontrada" });
    res.json(sale);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};   