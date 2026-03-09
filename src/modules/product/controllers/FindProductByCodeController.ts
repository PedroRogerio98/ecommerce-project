import { Request, Response } from "express";
import { FindProductByCodeService } from "../services/FindProductByCodeService";
import { AppError } from "../../../shared/errors/ApiError";

export class FindProductByCodeController {

    constructor(
        private service: FindProductByCodeService
    ) { }

    async handle(req: Request, res: Response) {

        const { sku } = req.params;

        const product = await this.service.execute({
            sku: sku as string
        });

        if (!product) {
            throw new AppError("Produto não encontrado", 404);
        }

        return res.status(200).json({
            message: "Produto encontrado com sucesso",
            product
        });
    }

}