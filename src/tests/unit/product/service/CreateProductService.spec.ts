import { CreateProductService } from "../../../../modules/product/services/CreateProductService";

describe("CreateProductService", () => {

    it("should create a product", async () => {

        const mockRepository = {
            create: jest.fn().mockResolvedValue({
                id: "1",
                sku: "123456",
                nome: "Mouse Gamer",
                descricao: "Mouse Gamer",
                preco: 200,
                quantidade: 10
            })
        };

        const service = new CreateProductService(mockRepository as any);

        const result = await service.execute({
            sku: "123456",
            nome: "Mouse Gamer",
            preco: 200,
            quantidade: 10
        });

        expect(mockRepository.create).toHaveBeenCalled();

        expect(result).toHaveProperty("id");

    });

    it("should throw error if price is invalid", async () => {

        const mockRepository = {
            create: jest.fn().mockResolvedValue({
                id: "1",
                sku: "123456",
                nome: "Mouse Gamer",
                descricao: "Mouse Gamer",
                preco: 200,
                quantidade: 10
            })
        };

        const service = new CreateProductService(mockRepository as any);

        await expect(
            service.execute({
                sku: "123456",
                nome: "Mouse Gamer",
                preco: 0,
                quantidade: 10
            } as any)
        ).rejects.toThrow();

    });

    it("should throw error if quantity is invalid", async () => {

        const mockRepository = {
            create: jest.fn().mockResolvedValue({
                id: "1",
                sku: "123456",
                nome: "Mouse Gamer",
                descricao: "Mouse Gamer",
                preco: 200,
                quantidade: 10
            })
        };

        const service = new CreateProductService(mockRepository as any);

        await expect(
            service.execute({
                sku: "123456",
                nome: "Mouse Gamer",
                preco: 200,
                quantidade: 0
            } as any)
        ).rejects.toThrow();

    });

    it("should throw error if sku is invalid", async () => {

        const mockRepository = {
            create: jest.fn().mockResolvedValue({
                id: "1",
                sku: "123456",
                nome: "Mouse Gamer",
                descricao: "Mouse Gamer",
                preco: 200,
                quantidade: 10
            })
        };

        const service = new CreateProductService(mockRepository as any);

        await expect(
            service.execute({
                sku: "",
                nome: "Mouse Gamer",
                preco: 200,
                quantidade: 10
            } as any)
        ).rejects.toThrow();

    });

    it("should throw error if name is invalid", async () => {

        const mockRepository = {
            create: jest.fn().mockResolvedValue({
                id: "1",
                sku: "123456",
                nome: "Mouse Gamer",
                descricao: "Mouse Gamer",
                preco: 200,
                quantidade: 10
            })
        };

        const service = new CreateProductService(mockRepository as any);

        await expect(
            service.execute({
                sku: "123456",
                nome: "",
                preco: 200,
                quantidade: 10
            } as any)
        ).rejects.toThrow();

    });

});