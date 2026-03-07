import { CreateProductDTO } from "../dto/CreateProductDTO";
import { AppError } from "../../../shared/errors/ApiError";

export function validateCreateProduct(data: CreateProductDTO) {

    if (!data.nome) {
        throw AppError.badRequest("Nome é obrigatório");
    }

    if (!data.preco || data.preco <= 0) {
        throw AppError.badRequest("Preço deve ser maior que zero");
    }

    if (!data.quantidade || data.quantidade <= 0) {
        throw AppError.badRequest("Quantidade deve ser maior que zero");
    }

    if (!data.sku) {
        throw AppError.badRequest("SKU é obrigatório");
    }

    if (data.sku.length > 50) {
        throw AppError.badRequest("SKU deve ter no máximo 50 caracteres");
    }

    if (data.sku.length < 3) {
        throw AppError.badRequest("SKU deve ter no mínimo 3 caracteres");
    }

    if (data.nome.length > 255) {
        throw AppError.badRequest("Nome deve ter no máximo 255 caracteres");
    }

    if (data.nome.length < 3) {
        throw AppError.badRequest("Nome deve ter no mínimo 3 caracteres");
    }

}