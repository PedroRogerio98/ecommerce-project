import { Router } from "express";
import { CreateProductController } from "../controllers/CreateProductController";

const productRoutes = Router();

const controller = new CreateProductController();

productRoutes.post("/", controller.handle);

export default productRoutes;