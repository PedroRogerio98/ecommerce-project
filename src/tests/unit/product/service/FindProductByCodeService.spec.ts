import { FindProductByCodeService } from "../../../../modules/product/services/FindProductByCodeService";
import { IProductRepository } from "../../../../modules/product/repositories/IProductRepository";
import { FindProductByCodeDTO } from "../../../../modules/product/dto/FindProductByCodeDTO";
import { AppError } from "../../../../shared/errors/ApiError";

describe("FindProductByCodeService", () => {
    let findProductByCodeService: FindProductByCodeService;
    let mockProductRepository: jest.Mocked<IProductRepository>;

    beforeEach(() => {
        mockProductRepository = {
            create: jest.fn(),
            findByCode: jest.fn(),
            deleteByCode: jest.fn(),
            list: jest.fn(),
            update: jest.fn(),
        } as unknown as jest.Mocked<IProductRepository>;

        findProductByCodeService = new FindProductByCodeService(mockProductRepository);
    });

    it("should be able to find a product by code (sku)", async () => {
        const productData: FindProductByCodeDTO = { sku: "SKU123" };
        const mockedProduct = { id: "1", sku: "SKU123", nome: "Product", preco: 10, quantidade: 5 };

        mockProductRepository.findByCode.mockResolvedValue(mockedProduct);

        const result = await findProductByCodeService.execute(productData);

        expect(result).toEqual(mockedProduct);
        expect(mockProductRepository.findByCode).toHaveBeenCalledWith(productData);
    });

    it("should throw an AppError if product is not found", async () => {
        const productData: FindProductByCodeDTO = { sku: "SKU123" };

        mockProductRepository.findByCode.mockResolvedValue(null);

        await expect(findProductByCodeService.execute(productData)).rejects.toBeInstanceOf(AppError);
        await expect(findProductByCodeService.execute(productData)).rejects.toMatchObject({
            message: "Produto não encontrado",
            statusCode: 404
        });
    });

    it("should throw an AppError if sku is not provided", async () => {
        const productData = {} as FindProductByCodeDTO;

        await expect(findProductByCodeService.execute(productData)).rejects.toBeInstanceOf(AppError);
        expect(mockProductRepository.findByCode).not.toHaveBeenCalled();
    });

    it("should throw an AppError if sku length is less than 3", async () => {
        const productData: FindProductByCodeDTO = { sku: "AB" };

        await expect(findProductByCodeService.execute(productData)).rejects.toBeInstanceOf(AppError);
        expect(mockProductRepository.findByCode).not.toHaveBeenCalled();
    });
});
