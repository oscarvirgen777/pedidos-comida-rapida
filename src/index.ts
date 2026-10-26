import express from "express";
import type { Request, Response } from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

// ============ INTERFAZ (según enunciado) ============
interface Pedido {
  id: number;
  cliente: string;
  platillo: string;
  total: number;
  entregado: boolean;
}

// ============ BASE DE DATOS SIMULADA ============
let pedidos: Pedido[] = [
  { id: 1, cliente: "Juan Pérez", platillo: "Hamburguesa Doble", total: 120.00, entregado: false },
  { id: 2, cliente: "María López", platillo: "Tacos al Pastor (6 pzas)", total: 85.50, entregado: true },
  { id: 3, cliente: "Carlos Ruiz", platillo: "Burrito Supremo", total: 95.00, entregado: false }
];

let nextId = 4;
// ====================================================

// GET /api/pedidos – Listar todos
app.get("/api/pedidos", (_req: Request, res: Response) => {
  res.json({ success: true, count: pedidos.length, data: pedidos });
});

// GET /api/pedidos/:id – Buscar por ID
app.get("/api/pedidos/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const pedido = pedidos.find((p) => p.id === id);
  if (!pedido) {
    return res.status(404).json({ success: false, message: `Pedido con ID ${id} no encontrado` });
  }
  res.json({ success: true, data: pedido });
});

// POST /api/pedidos – Crear pedido
app.post("/api/pedidos", (req: Request, res: Response) => {
  const { cliente, platillo, total } = req.body;

  if (!cliente || !platillo || total === undefined) {
    return res.status(400).json({ success: false, message: "Faltan campos: cliente, platillo, total" });
  }

  const nuevo: Pedido = { id: nextId++, cliente, platillo, total: Number(total), entregado: false };
  pedidos.push(nuevo);
  res.status(201).json({ success: true, data: nuevo });
});

// PUT /api/pedidos/:id – Modificar pedido
app.put("/api/pedidos/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = pedidos.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: `Pedido con ID ${id} no encontrado` });
  }

  const { cliente, platillo, total, entregado } = req.body;
  const pedido = pedidos[index]!;

  if (cliente !== undefined) pedido.cliente = cliente;
  if (platillo !== undefined) pedido.platillo = platillo;
  if (total !== undefined) pedido.total = Number(total);
  if (entregado !== undefined) pedido.entregado = Boolean(entregado);

  res.json({ success: true, data: pedido });
});

// DELETE /api/pedidos/:id – Cancelar pedido
app.delete("/api/pedidos/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = pedidos.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: `Pedido con ID ${id} no encontrado` });
  }

  const eliminado = pedidos.splice(index, 1)[0]!;
  res.json({ success: true, message: "Pedido cancelado", data: eliminado });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor en http://localhost:${PORT}`);
});   