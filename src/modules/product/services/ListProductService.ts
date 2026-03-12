import { IProductRepository } from "../repositories/IProductRepository";
import { AppError } from "../../../shared/errors/ApiError";

export class ListProductService {

    constructor(
        private repository: IProductRepository
    ) { }

    async execute() {
        const products = await this.repository.list();

        if (products.length === 0) {
            throw new AppError("Nenhum produto encontrado", 404);
        }

        return products;
    }
}