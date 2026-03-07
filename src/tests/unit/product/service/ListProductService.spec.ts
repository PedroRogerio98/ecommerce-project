import { ListProductService } from "../../../../modules/product/services/ListProductService";
import { AppError } from "../../../../shared/errors/ApiError";

describe("ListProductService", () => {

    it("should return a list of products", async () => {

        const mockRepository = {
            list: jest.fn().mockResolvedValue([
                {
                    id: "1",
                    nome: "Produto Teste",
                    preco: 100
                },
                {
                    id: "2",
                    nome: "Produto Teste 2",
                    preco: 200
                }
            ])
        };

        const service = new ListProductService(mockRepository as any);

        const products = await service.execute();

        expect(mockRepository.list).toHaveBeenCalled();

        expect(products).toHaveLength(2);

    });

    it("should throw AppError if there is no products found", async () => {

        const mockRepository = {
            list: jest.fn().mockResolvedValue([])
        };

        const service = new ListProductService(mockRepository as any);

        await expect(service.execute()).rejects.toBeInstanceOf(AppError);
        await expect(service.execute()).rejects.toMatchObject({ statusCode: 404 });

    });

});