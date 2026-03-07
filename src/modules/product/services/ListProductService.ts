import { IProductRepository } from "../repositories/IProductRepository";
import { AppError } from "../../../shared/errors/ApiError";

export class ListProductService {

    constructor(
        private repository: IProductRepository
    ) { }

    async execute() {
        const products = await this.repository.list();

        if (products.length === 0) {
            throw AppError.notFound("Nenhum produto encontrado");
        }

        return products;
    }
}