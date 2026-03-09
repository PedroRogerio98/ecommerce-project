import { IProductRepository } from "../repositories/IProductRepository";
import { UpdateProductDTO } from "../dto/UpdateProductDTO";
import { AppError } from "../../../shared/errors/ApiError";
import { validateUpdateProduct } from "../validations/UpdateProductValidation";

export class UpdateProductService {
    constructor(
        private repository: IProductRepository
    ) { }

    async execute(data: UpdateProductDTO) {
        const productExists = await this.repository.findByCode(data);

        if (!productExists) {
            throw AppError.badRequest("Produto não encontrado");
        }

        validateUpdateProduct(data);

        const product = await this.repository.update(data);

        if (!product) {
            throw AppError.badRequest("Erro ao atualizar produto");
        }

        return product;
    }
}