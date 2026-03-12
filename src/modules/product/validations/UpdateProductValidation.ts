import { UpdateProductDTO } from "../dto/UpdateProductDTO";
import { AppError } from "../../../shared/errors/ApiError";

export function validateUpdateProduct(data: UpdateProductDTO) {
    if (!data.sku) {
        throw new AppError("SKU é obrigatório", 400, { field: "sku" });
    }

    if (!data.nome) {
        throw new AppError("Nome é obrigatório", 400, { field: "nome" });
    }

    if (!data.descricao) {
        throw new AppError("Descrição é obrigatória", 400, { field: "descricao" });
    }

    if (!data.preco) {
        throw new AppError("Preço é obrigatório", 400, { field: "preco" });
    }

    if (!data.quantidade) {
        throw new AppError("Quantidade é obrigatória", 400, { field: "quantidade" });
    }
}