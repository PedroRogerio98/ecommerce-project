import { Request, Response } from "express";
import { FindProductByCodeController } from "../../../../modules/product/controllers/FindProductByCodeController";
import { FindProductByCodeService } from "../../../../modules/product/services/FindProductByCodeService";

describe("FindProductByCodeController", () => {
    let findProductByCodeController: FindProductByCodeController;
    let mockFindProductByCodeService: jest.Mocked<FindProductByCodeService>;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        mockFindProductByCodeService = {
            execute: jest.fn()
        } as unknown as jest.Mocked<FindProductByCodeService>;

        findProductByCodeController = new FindProductByCodeController(mockFindProductByCodeService);

        mockRequest = {
            params: {}
        };

        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it("should be able to handle find product by code successfully", async () => {
        const productData = { id: "1", sku: "SKU123", nome: "Product 1", preco: 10, quantidade: 5 };

        mockRequest.params = { sku: "SKU123" };
        mockFindProductByCodeService.execute.mockResolvedValue(productData as any);

        await findProductByCodeController.handle(mockRequest as Request, mockResponse as Response);

        expect(mockFindProductByCodeService.execute).toHaveBeenCalledWith({ sku: "SKU123" });
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "Produto encontrado com sucesso",
            product: productData
        });
    });

    it("should throw AppError if service returns null or undefined", async () => {
        mockRequest.params = { sku: "SKU123" };
        mockFindProductByCodeService.execute.mockResolvedValue(null as any);

        await expect(findProductByCodeController.handle(mockRequest as Request, mockResponse as Response)).rejects.toMatchObject({
            message: "Produto não encontrado",
            statusCode: 404
        });
    });

    it("should bubble up error from service if it throws", async () => {
        mockRequest.params = { sku: "SKU123" };
        const errorMessage = new Error("Service Error");
        mockFindProductByCodeService.execute.mockRejectedValue(errorMessage);

        await expect(findProductByCodeController.handle(mockRequest as Request, mockResponse as Response)).rejects.toThrow(errorMessage);
    });
});
