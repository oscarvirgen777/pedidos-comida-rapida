import express, { type Request, type Response } from "express"; 
import swaggerRouter from "./routes/swagger.router.js";
import cors from "cors"
import { pool } from './config/db.js';
import customerRoutes from "../src/routes/customer.routes.js";
import productRoutes from "../src/routes/product.routes.js";
import saleRoutes from "../src/routes/sale.routes.js";
import saleDetailRoutes from "../src/routes/sale_detail.routes.js";

const port = process.env.PORT; 



const app = express();

// Middlewares 
app.use(express.json());
app.use(cors())
app.use("/api/customers", customerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/sale-details", saleDetailRoutes);

app.use("/api/docs", swaggerRouter) 


app.get("/", (req: Request, res: Response) => {
    /*#swagger.tags = ['Tests']*/
    res.json({
        status: "Server online",
        version: "1.0.0"
    });
});

app.get('/api/menu', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el menú' });
  }
});

app.listen(port, () => {
    console.log(`URL: http://localhost:${port}`);
});