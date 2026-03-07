import { IProductRepository } from "../repositories/IProductRepository";
import { FindProductByCodeDTO } from "../dto/FindProductByCodeDTO";
import { validateFindProductByCode } from "../validations/FindProductByCode";
import { AppError } from "../../../shared/errors/ApiError";

export class FindProductByCodeService {

    constructor(
        private repository: IProductRepository
    ) { }

    async execute(data: FindProductByCodeDTO) {

        validateFindProductByCode(data);

        const product = await this.repository.findByCode(data);

        if (!product) {
            throw AppError.notFound("Produto não encontrado");
        }

        return product;

    }

}