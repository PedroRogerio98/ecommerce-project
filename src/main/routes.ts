import { Router } from "express";
import healthRoutes from "../modules/health/health.routes";

const routes = Router();

routes.use("/health", healthRoutes);

export default routes;