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
            throw AppError.notFound("Produto não encontrado");
        }

        try {
            await this.repository.deleteByCode({ sku: data.sku });
        } catch (error) {
            throw AppError.internalError("Erro ao excluir produto");
        }
    }

}