import request from "supertest";
import app from "../../../main/app";
import { pool } from "../../../database/connection";
import dotenv from "dotenv";

dotenv.config();

jest.mock("../../../database/connection", () => ({
    pool: {
        query: jest.fn()
    }
}));

describe("Delete Product By Code (Integration)", () => {

    it("should delete product by code via API", async () => {

        (pool.query as jest.Mock).mockResolvedValueOnce({
            rows: [{ sku: "123456", nome: "Product", descricao: "Test", preco: 100, quantidade: 10 }],
            rowCount: 1
        }).mockResolvedValueOnce({
            rowCount: 1
        });

        const basePath = process.env.BASE_PATH || "";
        const endpoint = basePath ? `/${basePath}/products/123456` : "/products/123456";
        const response = await request(app).delete(endpoint);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Produto deletado com sucesso");
    });

    it("should return 404 if product not found", async () => {
        (pool.query as jest.Mock).mockResolvedValueOnce({
            rows: [],
            rowCount: 0
        });

        const basePath = process.env.BASE_PATH || "";
        const endpoint = basePath ? `/${basePath}/products/123456` : "/products/123456";
        const response = await request(app).delete(endpoint);

        expect(response.status).toBe(404);
    });
});