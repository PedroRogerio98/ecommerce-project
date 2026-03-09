import { DeleteProductByCodeService } from "../../../../modules/product/services/DeleteProductByCodeService";
import { IProductRepository } from "../../../../modules/product/repositories/IProductRepository";
import { DeleteProductByCodeDTO } from "../../../../modules/product/dto/DeleteProductByCodeDTO";
import { AppError } from "../../../../shared/errors/ApiError";

describe("DeleteProductByCodeService", () => {
    let deleteProductService: DeleteProductByCodeService;
    let mockProductRepository: jest.Mocked<IProductRepository>;

    beforeEach(() => {
        mockProductRepository = {
            create: jest.fn(),
            findByCode: jest.fn(),
            deleteByCode: jest.fn(),
            list: jest.fn(),
            update: jest.fn(),
        } as unknown as jest.Mocked<IProductRepository>;

        deleteProductService = new DeleteProductByCodeService(mockProductRepository);
    });

    it("should be able to delete a product by sku", async () => {
        const productData: DeleteProductByCodeDTO = { sku: "SKU123" };
        const existingProduct = { id: "1", sku: "SKU123", nome: "Product", preco: 10, quantidade: 5 };

        mockProductRepository.findByCode.mockResolvedValue(existingProduct);
        mockProductRepository.deleteByCode.mockResolvedValue();

        await expect(deleteProductService.execute(productData)).resolves.not.toThrow();
        expect(mockProductRepository.findByCode).toHaveBeenCalledWith(productData);
        expect(mockProductRepository.deleteByCode).toHaveBeenCalledWith(productData);
    });

    it("should throw an AppError if product is not found", async () => {
        const productData: DeleteProductByCodeDTO = { sku: "SKU123" };

        mockProductRepository.findByCode.mockResolvedValue(null);

        await expect(deleteProductService.execute(productData)).rejects.toBeInstanceOf(AppError);
        await expect(deleteProductService.execute(productData)).rejects.toMatchObject({
            message: "Produto não encontrado",
            statusCode: 404
        });

        expect(mockProductRepository.deleteByCode).not.toHaveBeenCalled();
    });

    it("should throw an AppError if an error occurs during deletion", async () => {
        const productData: DeleteProductByCodeDTO = { sku: "SKU123" };
        const existingProduct = { id: "1", sku: "SKU123", nome: "Product", preco: 10, quantidade: 5 };

        mockProductRepository.findByCode.mockResolvedValue(existingProduct);
        mockProductRepository.deleteByCode.mockRejectedValue(new Error("Database Error"));

        await expect(deleteProductService.execute(productData)).rejects.toBeInstanceOf(AppError);
        await expect(deleteProductService.execute(productData)).rejects.toMatchObject({
            message: "Erro ao excluir produto",
            statusCode: 500
        });
    });

    it("should throw an AppError if validation fails (e.g., missing sku)", async () => {
        const productData = {} as DeleteProductByCodeDTO;

        await expect(deleteProductService.execute(productData)).rejects.toBeInstanceOf(AppError);
        expect(mockProductRepository.findByCode).not.toHaveBeenCalled();
        expect(mockProductRepository.deleteByCode).not.toHaveBeenCalled();
    });
});
