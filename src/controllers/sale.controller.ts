import type { Request, Response } from "express";   import { getAllSales, getSaleById, createSale } from "../models/sale.model.js";

export async function getSales(req: Request, res: Response) {
  try {
    const sales = await getAllSales();
    res.json(sales);
  } catch {
    res.status(500).json({ error: "Error interno" });
  }
}

export async function getSale(req: Request, res: Response) {
  try {
    const sale = await getSaleById(Number(req.params.id));
    if (!sale) return res.status(404).json({ error: "Venta no encontrada" });
    res.json(sale);
  } catch {
    res.status(500).json({ error: "Error interno" });
  }
}

export async function createSaleHandler(req: Request, res: Response) {
  try {
    const { customer_id, total } = req.body;
    const sale = await createSale(customer_id, total);
    res.status(201).json(sale);
  } catch {
    res.status(500).json({ error: "Error interno" });
  }
}   