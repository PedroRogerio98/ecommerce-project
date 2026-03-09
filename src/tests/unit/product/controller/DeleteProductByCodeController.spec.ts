import { Request, Response } from "express";
import { DeleteProductByCodeController } from "../../../../modules/product/controllers/DeleteProductByCodeController";
import { DeleteProductByCodeService } from "../../../../modules/product/services/DeleteProductByCodeService";
import { AppError } from "../../../../shared/errors/ApiError";

describe("DeleteProductByCodeController", () => {
    let deleteProductByCodeController: DeleteProductByCodeController;
    let mockDeleteProductByCodeService: jest.Mocked<DeleteProductByCodeService>;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        mockDeleteProductByCodeService = {
            execute: jest.fn()
        } as unknown as jest.Mocked<DeleteProductByCodeService>;

        deleteProductByCodeController = new DeleteProductByCodeController(mockDeleteProductByCodeService);

        mockRequest = {
            params: {}
        };

        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it("should be able to handle delete product by code successfully", async () => {
        mockRequest.params = { sku: "SKU123" };
        mockDeleteProductByCodeService.execute.mockResolvedValue();

        await deleteProductByCodeController.handle(mockRequest as Request, mockResponse as Response);

        expect(mockDeleteProductByCodeService.execute).toHaveBeenCalledWith({ sku: "SKU123" });
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "Produto deletado com sucesso",
            product: "SKU123"
        });
    });

    it("should return error status and message when service throws AppError", async () => {
        mockRequest.params = { sku: "SKU123" };
        const appError = new AppError("Produto não encontrado", 404);
        mockDeleteProductByCodeService.execute.mockRejectedValue(appError);

        await deleteProductByCodeController.handle(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: "Produto não encontrado" });
    });

    it("should return internal server error status when service throws a generic Error", async () => {
        mockRequest.params = { sku: "SKU123" };
        const genericError = new Error("Any internal error");
        mockDeleteProductByCodeService.execute.mockRejectedValue(genericError);

        await deleteProductByCodeController.handle(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: "Erro interno do servidor" });
    });
});
