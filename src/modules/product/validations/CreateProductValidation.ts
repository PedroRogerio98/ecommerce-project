import { CreateProductDTO } from "../dto/CreateProductDTO";

export function validateCreateProduct(data: CreateProductDTO) {

    if (!data.nome) {
        throw new Error("Nome é obrigatório");
    }

    if (!data.preco || data.preco <= 0) {
        throw new Error("Preço deve ser maior que zero");
    }

    if (!data.quantidade || data.quantidade <= 0) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    if (!data.sku) {
        throw new Error("SKU é obrigatório");
    }

}