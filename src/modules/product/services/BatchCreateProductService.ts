import { IProductRepository } from "../repositories/IProductRepository";
import { AppError } from "../../../shared/errors/ApiError";
import { CreateProductDTO } from "../dto/CreateProductDTO";

export class BatchCreateProductService {
    constructor(private productRepository: IProductRepository) { }

    async execute(data: CreateProductDTO[]) {
        try {
            if (!data || data.length === 0) {
                throw new AppError("Nenhum produto fornecido", 400);
            }

            const result = await this.productRepository.batchCreate(data);

            return { produtos: result };
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError(error, 500, error);
        }
    }
}