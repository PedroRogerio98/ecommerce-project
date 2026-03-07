import dotenv from "dotenv";
import { CreateProductService } from "../../../modules/product/services/CreateProductService";

dotenv.config();

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

});