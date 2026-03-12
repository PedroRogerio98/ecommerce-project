import { CreateProductDTO } from "../dto/CreateProductDTO";
import { AppError } from "../../../shared/errors/ApiError";

interface ValidationResult {
    error?: AppError;
    value?: CreateProductDTO;
}

export function validateCreateProduct(data: CreateProductDTO): ValidationResult {

    if (!data.nome) {
        return { error: new AppError("Nome é obrigatório", 400, { field: "nome" }) };
    }

    if (!data.preco || data.preco <= 0) {
        return { error: new AppError("Preço deve ser maior que zero", 400, { field: "preco" }) };
    }

    if (!data.quantidade || data.quantidade <= 0) {
        return { error: new AppError("Quantidade deve ser maior que zero", 400, { field: "quantidade" }) };
    }

    if (!data.sku) {
        return { error: new AppError("SKU é obrigatório", 400, { field: "sku" }) };
    }

    if (data.sku.length > 50) {
        return { error: new AppError("SKU deve ter no máximo 50 caracteres", 400, { field: "sku" }) };
    }

    if (data.sku.length < 3) {
        return { error: new AppError("SKU deve ter no mínimo 3 caracteres", 400, { field: "sku" }) };
    }

    if (data.nome.length > 255) {
        return { error: new AppError("Nome deve ter no máximo 255 caracteres", 400, { field: "nome" }) };
    }

    if (data.nome.length < 3) {
        return { error: new AppError("Nome deve ter no mínimo 3 caracteres", 400, { field: "nome" }) };
    }

    return { value: data };
}