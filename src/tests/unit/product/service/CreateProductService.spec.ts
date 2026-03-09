import { CreateProductService } from "../../../../modules/product/services/CreateProductService";
import { IProductRepository } from "../../../../modules/product/repositories/IProductRepository";
import { CreateProductDTO } from "../../../../modules/product/dto/CreateProductDTO";
import { AppError } from "../../../../shared/errors/ApiError";

describe("CreateProductService", () => {
    let createProductService: CreateProductService;
    let mockProductRepository: jest.Mocked<IProductRepository>;

    beforeEach(() => {
        mockProductRepository = {
            create: jest.fn(),
            findByCode: jest.fn(),
            deleteByCode: jest.fn(),
            list: jest.fn(),
            update: jest.fn(),
        } as unknown as jest.Mocked<IProductRepository>;

        createProductService = new CreateProductService(mockProductRepository);
    });

    it("should be able to create a new product", async () => {
        const productData: CreateProductDTO = {
            sku: "SKU123",
            nome: "Product Test",
            descricao: "Description Test",
            preco: 100,
            quantidade: 10
        };

        const createdProduct = { id: "1", ...productData };

        mockProductRepository.findByCode.mockResolvedValue(null);
        mockProductRepository.create.mockResolvedValue(createdProduct);

        const result = await createProductService.execute(productData);

        expect(result).toEqual(createdProduct);
        expect(mockProductRepository.findByCode).toHaveBeenCalledWith(productData);
        expect(mockProductRepository.create).toHaveBeenCalledWith(productData);
    });

    it("should not be able to create a product with an existing SKU", async () => {
        const productData: CreateProductDTO = {
            sku: "SKU123",
            nome: "Product Test",
            preco: 100,
            quantidade: 10
        };

        mockProductRepository.findByCode.mockResolvedValue({ id: "1", ...productData });

        await expect(createProductService.execute(productData)).rejects.toBeInstanceOf(AppError);
        await expect(createProductService.execute(productData)).rejects.toMatchObject({
            message: "Produto já cadastrado",
            statusCode: 400
        });

        expect(mockProductRepository.create).not.toHaveBeenCalled();
    });

    it("should not be able to create a product if repository fails to return the created product", async () => {
        const productData: CreateProductDTO = {
            sku: "SKU123",
            nome: "Product Test",
            preco: 100,
            quantidade: 10
        };

        mockProductRepository.findByCode.mockResolvedValue(null);
        mockProductRepository.create.mockResolvedValue(null);

        await expect(createProductService.execute(productData)).rejects.toBeInstanceOf(AppError);
        await expect(createProductService.execute(productData)).rejects.toMatchObject({
            message: "Erro ao criar produto",
            statusCode: 500
        });
    });

    it("should not be able to create a product with invalid data (validation error)", async () => {
        const invalidProductData = {
            sku: "SK", // less than 3
            nome: "Product Test",
            preco: 100,
            quantidade: 10
        };

        await expect(createProductService.execute(invalidProductData as CreateProductDTO)).rejects.toBeInstanceOf(AppError);
        expect(mockProductRepository.findByCode).not.toHaveBeenCalled();
    });
});
