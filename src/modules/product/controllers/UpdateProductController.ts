import { Request, Response } from "express";
import { UpdateProductService } from "../services/UpdateProduct";

export class UpdateProductController {
    constructor(
        private service: UpdateProductService
    ) { }

    async handle(req: Request, res: Response) {

        const { sku } = req.params;
        const { nome, descricao, preco, quantidade } = req.body;

        const product = await this.service.execute({ sku: String(sku), nome, descricao, preco, quantidade });

        return res.status(200).json({
            message: "Produto atualizado com sucesso",
            product
        });
    }
}