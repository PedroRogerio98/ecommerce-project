import { UpdateProductDTO } from "../dto/UpdateProductDTO";
import { AppError } from "../../../shared/errors/ApiError";

export function validateUpdateProduct(data: UpdateProductDTO) {
    if (!data.sku) {
        throw AppError.badRequest("SKU é obrigatório");
    }

    if (!data.nome) {
        throw AppError.badRequest("Nome é obrigatório");
    }

    if (!data.descricao) {
        throw AppError.badRequest("Descrição é obrigatória");
    }

    if (!data.preco) {
        throw AppError.badRequest("Preço é obrigatório");
    }

    if (!data.quantidade) {
        throw AppError.badRequest("Quantidade é obrigatória");
    }
}