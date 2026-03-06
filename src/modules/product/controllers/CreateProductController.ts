import { Request, Response } from "express";
import { CreateProductService } from "../services/CreateProductService";

export class CreateProductController {

    async handle(req: Request, res: Response) {

        const { sku, nome, descricao, preco, quantidade } = req.body;

        const service = new CreateProductService();

        const product = await service.execute({
            sku,
            nome,
            descricao,
            preco,
            quantidade
        });

        return res.status(201).json(product);
    }

}