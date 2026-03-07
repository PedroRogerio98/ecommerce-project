import { FindProductByCodeController } from "../../../../modules/product/controllers/FindProductByCodeController";
import { AppError } from "../../../../shared/errors/ApiError";

describe("FindProductByCodeController", () => {

    it("should return 200 when product is found", async () => {

        const mockService = {
            execute: jest.fn().mockResolvedValue({
                id: "1",
                nome: "Produto Teste",
                preco: 100
            })
        };

        const req: any = {
            params: {
                sku: "123456"
            },
            body: {
                nome: "Produto Teste",
                preco: 100
            }
        };

        const res: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const controller = new FindProductByCodeController(mockService as any);

        await controller.handle(req, res);

        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalled();

    });

    it("should reject with 404 AppError when product is not found", async () => {

        const mockService = {
            execute: jest.fn().mockResolvedValue(null)
        };

        const req: any = {
            params: {
                sku: "123456"
            },
            body: {
                nome: "Produto Teste",
                preco: 100
            }
        };

        const res: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const controller = new FindProductByCodeController(mockService as any);

        await expect(controller.handle(req, res)).rejects.toBeInstanceOf(AppError);
        await expect(controller.handle(req, res)).rejects.toMatchObject({ statusCode: 404 });

    });

});