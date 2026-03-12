import { IProductRepository } from "../repositories/IProductRepository";
import { CreateProductDTO } from "../dto/CreateProductDTO";
import { validateCreateProduct } from "../validations/CreateProductValidation";
import { AppError } from "../../../shared/errors/ApiError";

export class CreateProductService {

    constructor(
        private repository: IProductRepository
    ) { }

    async execute(data: CreateProductDTO) {

        const validationResult = validateCreateProduct(data);
        if (validationResult.error) {
            throw new AppError(validationResult.error.message, 400, validationResult.error);
        }

        const productExists = await this.repository.findByCode(data);

        if (productExists) {
            throw new AppError("Produto já cadastrado", 400, { field: "code" });
        }

        const product = await this.repository.create(data);

        if (!product) {
            throw new AppError("Erro ao criar produto", 500, { error: "Erro ao criar produto" });
        }

        return product;

    }

}