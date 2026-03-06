import { Router } from "express";
import healthRoutes from "../modules/health/health.routes";
import productRoutes from "../modules/product/routes/product.routes";
import dotenv from "dotenv";

dotenv.config();

const routes = Router();

const basePath = process.env.BASE_PATH ? `/${process.env.BASE_PATH}` : "";

routes.use(`${basePath}/health`, healthRoutes);
routes.use(`${basePath}/products`, productRoutes);

export default routes;