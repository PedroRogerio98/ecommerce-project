import { FindProductByCodeService } from "../../../../modules/product/services/FindProductByCodeService";
import { AppError } from "../../../../shared/errors/ApiError";

describe("FindProductByCodeService", () => {

    it("should find a product by code successfully", async () => {

        const mockRepository = {
            findByCode: jest.fn().mockResolvedValue({
                id: "1",
                sku: "123456",
                nome: "Mouse Gamer",
                descricao: "Mouse Gamer",
                preco: 200,
                quantidade: 10
            })
        };

        const service = new FindProductByCodeService(mockRepository as any);

        const product = await service.execute({
            sku: "123456",
        });

        expect(mockRepository.findByCode).toHaveBeenCalled();

        expect(product).toHaveProperty("id");

    });

    it("should throw AppError.notFound if it doesn't exist", async () => {

        const mockRepository = {
            findByCode: jest.fn().mockResolvedValue(null)
        };

        const service = new FindProductByCodeService(mockRepository as any);

        await expect(service.execute({
            sku: "123456",
        })).rejects.toBeInstanceOf(AppError);
        await expect(service.execute({
            sku: "123456",
        })).rejects.toMatchObject({ statusCode: 404 });

    });

    it("should throw error if code is invalid", async () => {

        const mockRepository = {
            findByCode: jest.fn().mockResolvedValue({
                sku: "123456",
                nome: "Mouse Gamer",
                descricao: "Mouse Gamer",
                preco: 200,
                quantidade: 10
            })
        };

        const service = new FindProductByCodeService(mockRepository as any);

        await expect(
            service.execute({
                sku: "",
            } as any)
        ).rejects.toThrow();

    });

});