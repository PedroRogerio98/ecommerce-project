import { ProductRepository } from "../repositories/ProductRepository";
import { CreateProductDTO } from "../dto/CreateProductDTO";
import { validateCreateProduct } from "../validations/CreateProductValidation";

export class CreateProductService {

    private repository: ProductRepository;

    constructor() {
        this.repository = new ProductRepository();
    }

    async execute(data: CreateProductDTO) {

        validateCreateProduct(data);

        return await this.repository.create(data);

    }

}