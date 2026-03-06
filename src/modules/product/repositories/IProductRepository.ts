import { CreateProductDTO } from "../dto/CreateProductDTO";

export interface IProductRepository {
    create(data: CreateProductDTO): Promise<any>;
}