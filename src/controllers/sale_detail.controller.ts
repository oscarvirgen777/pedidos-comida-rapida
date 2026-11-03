// src/controllers/sale_detail.controller.ts
import type { Request, Response } from "express";

import { SaleDetailModel } from "../models/sale_detail.model.js";

/*#swagger.tags = ['SaleDetails']
  #swagger.summary = 'Listar todos los detalles de venta' */
export const getSaleDetails = async (req: Request, res: Response) => {
  try {
    const details = await SaleDetailModel.findAll();
    res.json(details);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/*#swagger.tags = ['SaleDetails']
  #swagger.summary = 'Obtener un detalle por ID' */
export const getSaleDetail = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const detail = await SaleDetailModel.findById(id);
    if (!detail) return res.status(404).json({ error: "Detalle no encontrado" });
    res.json(detail);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/*#swagger.tags = ['SaleDetails']
  #swagger.summary = 'Crear un detalle de venta' */
export const createSaleDetail = async (req: Request, res: Response) => {
  try {
    const { sale_id, product_id, cantidad, precio_unit } = req.body;
    const detail = await SaleDetailModel.create(sale_id, product_id, cantidad, precio_unit);
    res.status(201).json(detail);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/*#swagger.tags = ['SaleDetails']
  #swagger.summary = 'Actualizar un detalle de venta' */
export const updateSaleDetail = async (req: Request, res: Response) => {
  try {
    const { sale_id, product_id, cantidad, precio_unit } = req.body;
    const id = req.params.id as string;
    const detail = await SaleDetailModel.update(id, sale_id, product_id, cantidad, precio_unit);
    if (!detail) return res.status(404).json({ error: "Detalle no encontrado" });
    res.json(detail);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/*#swagger.tags = ['SaleDetails']
  #swagger.summary = 'Eliminar un detalle de venta' */
export const deleteSaleDetail = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const detail = await SaleDetailModel.delete(id);
    if (!detail) return res.status(404).json({ error: "Detalle no encontrado" });
    res.json(detail);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};   