import { Router } from "express";
import { CreateProductController } from "../controllers/CreateProductController";
import { FindProductByCodeController } from "../controllers/FindProductByCodeController";
import { ListProductController } from "../controllers/ListProductController";
import { DeleteProductByCodeController } from "../controllers/DeleteProductByCodeController";
import { ProductRepository } from "../repositories/ProductRepository";
import { CreateProductService } from "../services/CreateProductService";
import { FindProductByCodeService } from "../services/FindProductByCodeService";
import { ListProductService } from "../services/ListProductService";
import { DeleteProductByCodeService } from "../services/DeleteProductByCodeService";


const productRoutes = Router();

const productRepository = new ProductRepository();
const createProductService = new CreateProductService(productRepository);
const listProductService = new ListProductService(productRepository);
const findProductByCodeService = new FindProductByCodeService(productRepository);
const deleteProductByCodeService = new DeleteProductByCodeService(productRepository);

const createProductController = new CreateProductController(createProductService);
const listProductController = new ListProductController(listProductService);
const findProductByCodeController = new FindProductByCodeController(findProductByCodeService);
const deleteProductByCodeController = new DeleteProductByCodeController(deleteProductByCodeService);

productRoutes.post("/", (req, res) => createProductController.handle(req, res));
productRoutes.get("/", (req, res) => listProductController.handle(req, res));
productRoutes.get("/:sku", (req, res) => findProductByCodeController.handle(req, res));
productRoutes.delete("/:sku", (req, res) => deleteProductByCodeController.handle(req, res));

export default productRoutes;