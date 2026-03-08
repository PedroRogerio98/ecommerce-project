import { DeleteProductByCodeController } from "../../../../modules/product/controllers/DeleteProductByCodeController";
import { AppError } from "../../../../shared/errors/ApiError";

describe("DeleteProductByCodeController", () => {

    it("should return 200 when product is deleted successfully", async () => {

        const mockService = {
            execute: jest.fn().mockResolvedValue(undefined)
        };

        const req: any = {
            params: {
                sku: "123456"
            }
        };

        const res: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const controller = new DeleteProductByCodeController(mockService as any);

        await controller.handle(req, res);

        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalledWith({ message: "Produto deletado com sucesso" });
    });

    it("should reject with AppError when no product is found", async () => {

        const mockService = {
            execute: jest.fn().mockRejectedValue(new AppError("Produto não encontrado", 404))
        };

        const req: any = {
            params: {
                sku: "123456"
            }
        };

        const res: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const controller = new DeleteProductByCodeController(mockService as any);

        await controller.handle(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: "Produto não encontrado" });
    });

});