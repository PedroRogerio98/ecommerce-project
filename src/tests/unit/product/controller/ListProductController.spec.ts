import { ListProductController } from "../../../../modules/product/controllers/ListProductController";
import { AppError } from "../../../../shared/errors/ApiError";

describe("ListProductController", () => {

    it("should return a list of products", async () => {

        const mockService = {
            execute: jest.fn().mockResolvedValue([
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
        const req: any = {};

        const res: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const controller = new ListProductController(mockService as any);

        await controller.handle(req, res);

        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalled();

    });

    it("should reject with 404 AppError when no products are found", async () => {

        const mockService = {
            execute: jest.fn().mockResolvedValue([])
        };

        const req: any = {};

        const res: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const controller = new ListProductController(mockService as any);

        await expect(controller.handle(req, res)).rejects.toBeInstanceOf(AppError);
        await expect(controller.handle(req, res)).rejects.toMatchObject({ statusCode: 404 });

    });

});