import { Request, Response } from "express";
import { DeleteProductByCodeService } from "../services/DeleteProductByCodeService";
import { AppError } from "../../../shared/errors/ApiError";

export class DeleteProductByCodeController {

    constructor(
        private service: DeleteProductByCodeService
    ) { }

    async handle(req: Request, res: Response) {

        const { sku } = req.params;

        try {
            await this.service.execute({
                sku: sku as string
            });

            const message = "Produto deletado com sucesso";

            return res.status(200).json({ message });
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({ error: error.message });
            }

            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }

}