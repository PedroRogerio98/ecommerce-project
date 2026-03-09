import { Request, Response } from "express";
import { ListProductController } from "../../../../modules/product/controllers/ListProductController";
import { ListProductService } from "../../../../modules/product/services/ListProductService";

describe("ListProductController", () => {
    let listProductController: ListProductController;
    let mockListProductService: jest.Mocked<ListProductService>;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        mockListProductService = {
            execute: jest.fn()
        } as unknown as jest.Mocked<ListProductService>;

        listProductController = new ListProductController(mockListProductService);

        mockRequest = {};

        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it("should be able to handle list all products successfully", async () => {
        const productsList = [
            { id: "1", sku: "SKU1", nome: "Product 1", preco: 10, quantidade: 5 },
            { id: "2", sku: "SKU2", nome: "Product 2", preco: 20, quantidade: 10 }
        ];

        mockListProductService.execute.mockResolvedValue(productsList as any);

        await listProductController.handle(mockRequest as Request, mockResponse as Response);

        expect(mockListProductService.execute).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "Produtos listados com sucesso",
            products: productsList
        });
    });

    it("should throw AppError if service returns an empty array", async () => {
        mockListProductService.execute.mockResolvedValue([]);

        await expect(listProductController.handle(mockRequest as Request, mockResponse as Response)).rejects.toMatchObject({
            message: "Nenhum produto encontrado",
            statusCode: 404
        });
    });

    it("should bubble up errors from the service", async () => {
        const errorMessage = new Error("Any Error");

        mockListProductService.execute.mockRejectedValue(errorMessage);

        await expect(listProductController.handle(mockRequest as Request, mockResponse as Response)).rejects.toThrow(errorMessage);
    });
});
