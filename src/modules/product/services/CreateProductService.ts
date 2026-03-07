import { IProductRepository } from "../repositories/IProductRepository";
import { CreateProductDTO } from "../dto/CreateProductDTO";
import { validateCreateProduct } from "../validations/CreateProductValidation";
import { AppError } from "../../../shared/errors/ApiError";

export class CreateProductService {

    constructor(
        private repository: IProductRepository
    ) { }

    async execute(data: CreateProductDTO) {

        validateCreateProduct(data);

        const product = await this.repository.create(data);

        if (!product) {
            throw AppError.internalError("Erro ao criar produto");
        }

        return product;

    }

}