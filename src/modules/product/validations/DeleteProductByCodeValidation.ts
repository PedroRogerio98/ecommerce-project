import { DeleteProductByCodeDTO } from "../dto/DeleteProductByCodeDTO";
import { AppError } from "../../../shared/errors/ApiError";

export function validateDeleteProductByCode(data: DeleteProductByCodeDTO) {

    if (!data.sku) {
        throw new AppError("SKU é obrigatório", 400, { field: "sku" });
    }

    if (data.sku.length > 50) {
        throw new AppError("SKU deve ter no máximo 50 caracteres", 400, { field: "sku" });
    }

    if (data.sku.length < 3) {
        throw new AppError("SKU deve ter no mínimo 3 caracteres", 400, { field: "sku" });
    }

}