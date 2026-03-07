import { Request, Response } from "express";
import { ListProductService } from "../services/ListProductService";
import { AppError } from "../../../shared/errors/ApiError";

export class ListProductController {

    constructor(
        private service: ListProductService
    ) { }

    async handle(req: Request, res: Response) {

        const products = await this.service.execute();

        if (products.length === 0) {
            throw AppError.notFound("Nenhum produto encontrado");
        }

        return res.status(200).json({ products });
    }
}