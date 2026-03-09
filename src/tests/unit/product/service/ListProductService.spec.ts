import { ListProductService } from "../../../../modules/product/services/ListProductService";
import { IProductRepository } from "../../../../modules/product/repositories/IProductRepository";
import { AppError } from "../../../../shared/errors/ApiError";

describe("ListProductService", () => {
    let listProductService: ListProductService;
    let mockProductRepository: jest.Mocked<IProductRepository>;

    beforeEach(() => {
        mockProductRepository = {
            create: jest.fn(),
            findByCode: jest.fn(),
            deleteByCode: jest.fn(),
            list: jest.fn(),
            update: jest.fn(),
        } as unknown as jest.Mocked<IProductRepository>;

        listProductService = new ListProductService(mockProductRepository);
    });

    it("should be able to list all products", async () => {
        const mockedProducts = [
            { id: "1", sku: "SKU1", nome: "Prod 1", preco: 10, quantidade: 5 },
            { id: "2", sku: "SKU2", nome: "Prod 2", preco: 20, quantidade: 10 }
        ];

        mockProductRepository.list.mockResolvedValue(mockedProducts);

        const result = await listProductService.execute();

        expect(result).toEqual(mockedProducts);
        expect(mockProductRepository.list).toHaveBeenCalledTimes(1);
    });

    it("should throw a AppError if no product is found", async () => {
        mockProductRepository.list.mockResolvedValue([]);

        await expect(listProductService.execute()).rejects.toBeInstanceOf(AppError);
        await expect(listProductService.execute()).rejects.toMatchObject({
            message: "Nenhum produto encontrado",
            statusCode: 404
        });
    });
});
