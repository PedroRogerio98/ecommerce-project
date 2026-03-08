import { CreateProductDTO } from "../dto/CreateProductDTO";
import { FindProductByCodeDTO } from "../dto/FindProductByCodeDTO";
import { DeleteProductByCodeDTO } from "../dto/DeleteProductByCodeDTO";

export interface IProductRepository {
    create(data: CreateProductDTO): Promise<any>;
    findByCode(data: FindProductByCodeDTO): Promise<any>;
    deleteByCode(data: DeleteProductByCodeDTO): Promise<void>;
    list(): Promise<any[]>;
}