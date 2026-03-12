import { IProductRepository } from "../repositories/IProductRepository";
import { DeleteProductByCodeDTO } from "../dto/DeleteProductByCodeDTO";
import { AppError } from "../../../shared/errors/ApiError";
import { validateDeleteProductByCode } from "../validations/DeleteProductByCodeValidation";

export class DeleteProductByCodeService {

    constructor(
        private repository: IProductRepository
    ) { }

    async execute(data: DeleteProductByCodeDTO) {

        validateDeleteProductByCode(data);

        const product = await this.repository.findByCode({ sku: data.sku });

        if (!product) {
            throw new AppError("Produto não encontrado", 404);
        }

        try {
            await this.repository.deleteByCode({ sku: data.sku });
        } catch (error) {
            throw new AppError("Erro ao excluir produto", 500, error);
        }
    }

}