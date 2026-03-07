import { CreateProductController } from "../../../../modules/product/controllers/CreateProductController";
import { AppError } from "../../../../shared/errors/ApiError";

describe("CreateProductController", () => {

    it("should return 201 when product is created", async () => {

        const mockService = {
            execute: jest.fn().mockResolvedValue({
                id: "1",
                nome: "Produto Teste",
                preco: 100
            })
        };

        const req: any = {
            body: {
                nome: "Produto Teste",
                preco: 100
            }
        };

        const res: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const controller = new CreateProductController(mockService as any);

        await controller.handle(req, res);

        expect(res.status).toHaveBeenCalledWith(201);

        expect(res.json).toHaveBeenCalled();

    });

    it("should reject with AppError when product is not created", async () => {

        const mockService = {
            execute: jest.fn().mockRejectedValue(AppError.badRequest("Invalid properties"))
        };

        const req: any = {
            body: {
                nome: "Produto Teste",
                preco: 100
            }
        };

        const res: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const controller = new CreateProductController(mockService as any);

        await expect(controller.handle(req, res)).rejects.toBeInstanceOf(AppError);
        await expect(controller.handle(req, res)).rejects.toMatchObject({ statusCode: 400 });

    });

});