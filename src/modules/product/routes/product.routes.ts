import { Router } from "express";
import { CreateProductController } from "../controllers/CreateProductController";
import { FindProductByCodeController } from "../controllers/FindProductByCodeController";
import { ProductRepository } from "../repositories/ProductRepository";
import { CreateProductService } from "../services/CreateProductService";
import { FindProductByCodeService } from "../services/FindProductByCodeService";

const productRoutes = Router();

const productRepository = new ProductRepository();
const createProductService = new CreateProductService(productRepository);
const findProductByCodeService = new FindProductByCodeService(productRepository);

const createProductController = new CreateProductController(createProductService);
const findProductByCodeController = new FindProductByCodeController(findProductByCodeService);

productRoutes.post("/", (req, res) => createProductController.handle(req, res));
productRoutes.get("/:sku", (req, res) => findProductByCodeController.handle(req, res));

export default productRoutes;