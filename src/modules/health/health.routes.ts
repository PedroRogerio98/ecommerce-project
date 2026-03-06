import { Router } from "express";
import { HealthController } from "./HealthController";

const healthRoutes = Router();
const controller = new HealthController();

healthRoutes.get("/", controller.check);

export default healthRoutes;