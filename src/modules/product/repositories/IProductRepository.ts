import { CreateProductDTO } from "../dto/CreateProductDTO";
import { FindProductByCodeDTO } from "../dto/FindProductByCodeDTO";

export interface IProductRepository {
    create(data: CreateProductDTO): Promise<any>;
    findByCode(data: FindProductByCodeDTO): Promise<any>;
}