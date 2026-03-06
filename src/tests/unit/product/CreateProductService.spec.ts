import { CreateProductService } from "../../../modules/product/services/CreateProductService";
import { IProductRepository } from "../../../modules/product/repositories/IProductRepository";

class FakeProductRepository implements IProductRepository {

    async create(data: any): Promise<any> {
        return {
            id: "fake-id",
            ...data
        };
    }

}

describe("CreateProductService", () => {

    it("should create a product successfully", async () => {

        const repository = new FakeProductRepository();
        const service = new CreateProductService(repository as any);

        const product = await service.execute({
            sku: "123456",
            nome: "Teclado Gamer",
            descricao: "RGB",
            preco: 500,
            quantidade: 10
        });

        expect(product.nome).toBe("Teclado Gamer");

    });

    it("should throw error if price is invalid", async () => {

        const repository = new FakeProductRepository();
        const service = new CreateProductService(repository as any);

        await expect(
            service.execute({
                sku: "123456",
                nome: "Produto inválido",
                preco: 0,
                quantidade: 10
            } as any)
        ).rejects.toThrow();

    });

    it("should throw error if quantity is invalid", async () => {

        const repository = new FakeProductRepository();
        const service = new CreateProductService(repository as any);

        await expect(
            service.execute({
                sku: "123456",
                nome: "Produto inválido",
                preco: 500,
                quantidade: 0
            } as any)
        ).rejects.toThrow();

    });

    it("should throw error if sku is invalid", async () => {

        const repository = new FakeProductRepository();
        const service = new CreateProductService(repository as any);

        await expect(
            service.execute({
                sku: "",
                nome: "Produto inválido",
                preco: 500,
                quantidade: 10
            } as any)
        ).rejects.toThrow();

    });

});