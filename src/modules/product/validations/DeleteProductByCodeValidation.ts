import { DeleteProductByCodeDTO } from "../dto/DeleteProductByCodeDTO";
import { AppError } from "../../../shared/errors/ApiError";

export function validateDeleteProductByCode(data: DeleteProductByCodeDTO) {

    if (!data.sku) {
        throw AppError.badRequest("SKU é obrigatório", "sku");
    }

    if (data.sku.length > 50) {
        throw AppError.badRequest("SKU deve ter no máximo 50 caracteres", "sku");
    }

    if (data.sku.length < 3) {
        throw AppError.badRequest("SKU deve ter no mínimo 3 caracteres", "sku");
    }

}