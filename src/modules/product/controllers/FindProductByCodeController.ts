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
            throw AppError.notFound("Produto não encontrado");
        }

        return res.status(200).json({ product });
    }

}