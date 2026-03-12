import { Request, Response } from "express";
import { BatchCreateProductService } from "../services/BatchCreateProductService";

export class BatchCreateProductController {
    constructor(private batchCreateProductService: BatchCreateProductService) { }

    async handle(request: Request, response: Response) {
        const { produtos } = request.body;

        const result = await this.batchCreateProductService.execute(produtos);

        return response.status(201).json({ message: "Produtos criados com sucesso", data: result });
    }
}