import type { Request, Response, NextFunction } from 'express';
   import { z } from 'zod';

const productSchema = z.object({
  name: z.string().min(1, 'name es requerido y no puede ser vacío'),
  description: z.string().min(1, 'description es requerido y no puede ser vacío'),
  price: z.number().positive('price debe ser mayor a cero'),
  cost: z.number().min(0, 'cost debe ser mayor o igual a cero').optional(),
  stock: z.number().int().min(0, 'stock debe ser un entero mayor o igual a cero').optional(),
});

export function validateProduct(req: Request, res: Response, next: NextFunction) {
  const result = productSchema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));

    return res.status(400).json({
      error: 'Validación fallida',
      details: errors,
    });
  }

  req.body = result.data;
  next();
}   