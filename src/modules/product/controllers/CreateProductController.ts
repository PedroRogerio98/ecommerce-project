import { Request, Response } from "express";
import { CreateProductService } from "../services/CreateProductService";

export class CreateProductController {

    constructor(
        private service: CreateProductService
    ) { }

    async handle(req: Request, res: Response) {

        const { sku, nome, descricao, preco, quantidade } = req.body;

        const product = await this.service.execute({
            sku,
            nome,
            descricao,
            preco,
            quantidade
        });

        return res.status(201).json({
            message: "Produto criado com sucesso",
            product
        });
    }

}