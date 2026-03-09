import { Request, Response } from "express";
import { UpdateProductController } from "../../../../modules/product/controllers/UpdateProductController";
import { UpdateProductService } from "../../../../modules/product/services/UpdateProduct";

describe("UpdateProductController", () => {
    let updateProductController: UpdateProductController;
    let mockUpdateProductService: jest.Mocked<UpdateProductService>;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        mockUpdateProductService = {
            execute: jest.fn()
        } as unknown as jest.Mocked<UpdateProductService>;

        updateProductController = new UpdateProductController(mockUpdateProductService);

        mockRequest = {
            params: {},
            body: {}
        };

        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it("should be able to handle product update successfully", async () => {
        const productData = { sku: "SKU123", nome: "Updated Product", descricao: "Updated Description", preco: 150, quantidade: 20 };
        const returnedProduct = { id: "1", ...productData };

        mockRequest.params = { sku: "SKU123" };
        mockRequest.body = {
            nome: productData.nome,
            descricao: productData.descricao,
            preco: productData.preco,
            quantidade: productData.quantidade
        };

        mockUpdateProductService.execute.mockResolvedValue(returnedProduct as any);

        await updateProductController.handle(mockRequest as Request, mockResponse as Response);

        expect(mockUpdateProductService.execute).toHaveBeenCalledWith(productData);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "Produto atualizado com sucesso",
            product: returnedProduct
        });
    });

    it("should bubble up error from service if it throws", async () => {
        mockRequest.params = { sku: "SKU123" };
        mockRequest.body = { nome: "Updated Product", descricao: "Desc", preco: 10, quantidade: 1 };

        const errorMessage = new Error("Service Error");
        mockUpdateProductService.execute.mockRejectedValue(errorMessage);

        await expect(updateProductController.handle(mockRequest as Request, mockResponse as Response)).rejects.toThrow(errorMessage);
    });
});
