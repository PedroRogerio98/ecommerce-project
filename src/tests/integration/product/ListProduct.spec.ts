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

describe("List Products (Integration)", () => {

    it("should list products via API", async () => {
        
        (pool.query as jest.Mock).mockResolvedValueOnce({
            rows: [
                {
                    id: "123456",
                    sku: "123456",
                    nome: "Mouse Gamer",
                    descricao: "Mouse Gamer",
                    preco: 200,
                    quantidade: 10
                },
                {
                    id: "654321",
                    sku: "654321",
                    nome: "Teclado Gamer",
                    descricao: "Teclado Gamer",
                    preco: 300,
                    quantidade: 5
                }
            ]
        });

        const basePath = process.env.BASE_PATH || "";
        const endpoint = basePath ? `/${basePath}/products` : "/products";

        const response = await request(app).get(endpoint);
        expect(response.status).toBe(200);
        expect(response.body.products).toHaveLength(2);
    });

});