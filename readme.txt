
## Interface

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | number | Identificador único |
| cliente | string | Nombre del cliente |
| platillo | string | Plato ordenado |
| total | number | Precio total (MXN) |
| entregado | boolean | Estado de entrega |

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/pedidos | Listar todos |
| GET | /api/pedidos/:id | Buscar por ID |
| POST | /api/pedidos | Crear pedido |
| PUT | /api/pedidos/:id | Modificar pedido |
| DELETE | /api/pedidos/:id | Cancelar pedido |

## Rutas probadas

| # | Método | URL | Body | Resultado |
|---|--------|-----|------|-----------|
| 1 | GET | http://localhost:3000/api/pedidos | — | 200 – lista 3 pedidos |
| 2 | GET | http://localhost:3000/api/pedidos/1 | — | 200 – Juan Pérez |
| 3 | POST | http://localhost:3000/api/pedidos | `{"cliente":"Ana","platillo":"Quesadilla","total":75}` | 201 – ID 4 |
| 4 | PUT | http://localhost:3000/api/pedidos/1 | `{ "entregado": true}` | 200 – entregado: true |
| 5 | DELETE | http://localhost:3000/api/pedidos/2 | — | 200 – cancelado |
