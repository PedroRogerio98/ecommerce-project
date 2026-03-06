import { Request, Response } from "express";
import { CreateProductService } from "../services/CreateProductService";

export class CreateProductController {

    async handle(req: Request, res: Response) {

        const { nome, descricao, preco } = req.body;

        const service = new CreateProductService();

        const product = await service.execute({
            nome,
            descricao,
            preco
        });

        return res.status(201).json(product);
    }

}