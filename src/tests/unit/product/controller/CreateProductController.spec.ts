import { Request, Response } from "express";
import { CreateProductController } from "../../../../modules/product/controllers/CreateProductController";
import { CreateProductService } from "../../../../modules/product/services/CreateProductService";

describe("CreateProductController", () => {
    let createProductController: CreateProductController;
    let mockCreateProductService: jest.Mocked<CreateProductService>;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        mockCreateProductService = {
            execute: jest.fn()
        } as unknown as jest.Mocked<CreateProductService>;

        createProductController = new CreateProductController(mockCreateProductService);

        mockRequest = {
            body: {}
        };

        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it("should be able to handle product creation successfully", async () => {
        const productData = {
            sku: "SKU123",
            nome: "Test Product",
            descricao: "Test Description",
            preco: 100,
            quantidade: 10
        };

        mockRequest.body = productData;

        const createdProduct = { id: "1", ...productData };
        mockCreateProductService.execute.mockResolvedValue(createdProduct as any);

        await createProductController.handle(mockRequest as Request, mockResponse as Response);

        expect(mockCreateProductService.execute).toHaveBeenCalledWith(productData);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "Produto criado com sucesso",
            product: createdProduct
        });
    });

    it("should bubble up errors from the service", async () => {
        mockRequest.body = { sku: "SKU123" };
        const errorMessage = new Error("Any Error");

        mockCreateProductService.execute.mockRejectedValue(errorMessage);

        await expect(createProductController.handle(mockRequest as Request, mockResponse as Response)).rejects.toThrow(errorMessage);
    });
});
