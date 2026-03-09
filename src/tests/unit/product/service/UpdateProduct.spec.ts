import { UpdateProductService } from "../../../../modules/product/services/UpdateProduct";
import { IProductRepository } from "../../../../modules/product/repositories/IProductRepository";
import { UpdateProductDTO } from "../../../../modules/product/dto/UpdateProductDTO";
import { AppError } from "../../../../shared/errors/ApiError";

describe("UpdateProductService", () => {
    let updateProductService: UpdateProductService;
    let mockProductRepository: jest.Mocked<IProductRepository>;

    beforeEach(() => {
        mockProductRepository = {
            create: jest.fn(),
            findByCode: jest.fn(),
            deleteByCode: jest.fn(),
            list: jest.fn(),
            update: jest.fn(),
        } as unknown as jest.Mocked<IProductRepository>;

        updateProductService = new UpdateProductService(mockProductRepository);
    });

    it("should be able to update a product", async () => {
        const productData: UpdateProductDTO = {
            sku: "SKU123",
            nome: "Updated Product",
            descricao: "Updated Description",
            preco: 150,
            quantidade: 20
        };

        const existingProduct = { id: "1", ...productData, nome: "Old Name" };
        const updatedProduct = { id: "1", ...productData };

        mockProductRepository.findByCode.mockResolvedValue(existingProduct);
        mockProductRepository.update.mockResolvedValue(updatedProduct);

        const result = await updateProductService.execute(productData);

        expect(result).toEqual(updatedProduct);
        expect(mockProductRepository.findByCode).toHaveBeenCalledWith(productData);
        expect(mockProductRepository.update).toHaveBeenCalledWith(productData);
    });

    it("should throw an AppError if product is not found", async () => {
        const productData: UpdateProductDTO = {
            sku: "SKU123",
            nome: "Updated Product",
            descricao: "Updated Description",
            preco: 150,
            quantidade: 20
        };

        mockProductRepository.findByCode.mockResolvedValue(null);

        await expect(updateProductService.execute(productData)).rejects.toBeInstanceOf(AppError);
        await expect(updateProductService.execute(productData)).rejects.toMatchObject({
            message: "Produto não encontrado",
            statusCode: 400
        });

        expect(mockProductRepository.update).not.toHaveBeenCalled();
    });

    it("should throw an AppError if validation fails (e.g., missing price)", async () => {
        const productData = {
            sku: "SKU123",
            nome: "Updated Product",
            descricao: "Updated Description",
            quantidade: 20
        } as UpdateProductDTO;

        mockProductRepository.findByCode.mockResolvedValue({ id: "1", sku: "SKU123" });

        await expect(updateProductService.execute(productData)).rejects.toBeInstanceOf(AppError);
        await expect(updateProductService.execute(productData)).rejects.toMatchObject({
            message: "Preço é obrigatório",
            statusCode: 400
        });

        expect(mockProductRepository.update).not.toHaveBeenCalled();
    });

    it("should throw an AppError if update fails to return the product", async () => {
        const productData: UpdateProductDTO = {
            sku: "SKU123",
            nome: "Updated Product",
            descricao: "Updated Description",
            preco: 150,
            quantidade: 20
        };

        const existingProduct = { id: "1", ...productData };

        mockProductRepository.findByCode.mockResolvedValue(existingProduct);
        mockProductRepository.update.mockResolvedValue(null);

        await expect(updateProductService.execute(productData)).rejects.toBeInstanceOf(AppError);
        await expect(updateProductService.execute(productData)).rejects.toMatchObject({
            message: "Erro ao atualizar produto",
            statusCode: 400
        });
    });
});
