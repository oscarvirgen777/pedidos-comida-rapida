// src/controllers/customer.controller.ts
import type { Request, Response } from "express";

import { CustomerModel } from "../models/customer.model.js";

/*#swagger.tags = ['Customers']
  #swagger.summary = 'Listar todos los clientes' */
export const getCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await CustomerModel.findAll();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/*#swagger.tags = ['Customers']
  #swagger.summary = 'Obtener un cliente por ID' */
export const getCustomer = async (req: Request, res: Response) => {
  try {
const id = req.params.id as string;
const customer = await CustomerModel.findById(id);
    if (!customer) return res.status(404).json({ error: "Cliente no encontrado" });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/*#swagger.tags = ['Customers']
  #swagger.summary = 'Crear un nuevo cliente' */
export const createCustomer = async (req: Request, res: Response) => {
  try {
    const { nombre, correo, telefono } = req.body;
    const customer = await CustomerModel.create(nombre, correo, telefono);
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/*#swagger.tags = ['Customers']
  #swagger.summary = 'Actualizar un cliente' */
export const updateCustomer = async (req: Request, res: Response) => {
  try {
const id = req.params.id as string;
const customer = await CustomerModel.findById(id);
    if (!customer) return res.status(404).json({ error: "Cliente no encontrado" });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/*#swagger.tags = ['Customers']
  #swagger.summary = 'Eliminar un cliente' */
export const deleteCustomer = async (req: Request, res: Response) => {
  try {
const id = req.params.id as string;
const customer = await CustomerModel.findById(id);
    if (!customer) return res.status(404).json({ error: "Cliente no encontrado" });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};   