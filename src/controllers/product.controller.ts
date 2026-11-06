import type { Request, Response } from "express";

import { ProductModel } from "../models/product.models.js";

/*#swagger.tags = ['Products']
  #swagger.summary = 'Listar todos los productos'
  #swagger.parameters = {
    maxPrice: { in: 'query', type: 'number', description: 'Filtrar por precio máximo' },
    page: { in: 'query', type: 'number', description: 'Página (default 1)' },
    limit: { in: 'query', type: 'number', description: 'Items por página (default 10)' }
  } */
export const getProducts = async (req: Request, res: Response) => {
  try {
    const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : undefined;
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;

    const products = await ProductModel.findAll(maxPrice, page, limit);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/*#swagger.tags = ['Products']
  #swagger.summary = 'Obtener un producto por ID' */
export const getProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const product = await ProductModel.findById(id);
    if (!product) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/*#swagger.tags = ['Products']
  #swagger.summary = 'Crear un nuevo producto' */
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { nombre, detalles, precio } = req.body;
    const product = await ProductModel.create(nombre, detalles, precio);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/*#swagger.tags = ['Products']
  #swagger.summary = 'Actualizar un producto' */
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { nombre, detalles, precio } = req.body;
    const id = req.params.id as string;
    const product = await ProductModel.update(id, nombre, detalles, precio);
    if (!product) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/*#swagger.tags = ['Products']
  #swagger.summary = 'Eliminar un producto' */
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const product = await ProductModel.delete(id);
    if (!product) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};   