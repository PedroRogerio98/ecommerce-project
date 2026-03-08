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

describe("Find Product By Id (Integration)", () => {

    it("should find product by id via API", async () => {

        (pool.query as jest.Mock).mockResolvedValueOnce({
            rows: [{
                id: "123456",
                sku: "123456",
                nome: "Mouse Gamer",
                descricao: "Mouse Gamer",
                preco: 200,
                quantidade: 10
            }]
        });

        const basePath = process.env.BASE_PATH || "";
        const endpoint = basePath ? `/${basePath}/products/123456` : "/products/123456";

        const response = await request(app).get(endpoint);

        expect(response.status).toBe(200);

        expect(response.body.product).toBeDefined();
        expect(response.body.product.id).toBe("123456");
        expect(response.body.product.sku).toBe("123456");

    });

});