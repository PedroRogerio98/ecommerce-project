import { CreateProductService } from "../../../modules/product/services/CreateProductService";
import { IProductRepository } from "../../../modules/product/repositories/IProductRepository";

class FakeProductRepository implements IProductRepository {

    async create(data: any): Promise<any> {
        return {
            ...data
        };
    }

}

describe("CreateProductService", () => {

    it("should create a product successfully", async () => {

        const repository = new FakeProductRepository();
        const service = new CreateProductService(repository as any);

        const product = await service.execute({
            nome: "Teclado Gamer",
            descricao: "RGB",
            preco: 500
        });

        expect(product.nome).toBe("Teclado Gamer");

    });

    it("should throw error if price is invalid", async () => {

        const repository = new FakeProductRepository();
        const service = new CreateProductService(repository as any);

        await expect(
            service.execute({
                nome: "Produto inválido",
                preco: 0
            } as any)
        ).rejects.toThrow();

    });

});