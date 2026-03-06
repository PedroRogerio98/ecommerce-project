import request from "supertest";
import app from "../../../main/app";
import dotenv from "dotenv";

dotenv.config();

describe("Create Product (Integration)", () => {

    it("should create product via API", async () => {

        const basePath = process.env.BASE_PATH || "";
        const endpoint = basePath ? `/${basePath}/products` : "/products";

        const response = await request(app)
            .post(endpoint)
            .send({
                nome: "Monitor Gamer",
                descricao: "165hz",
                preco: 2000
            });

        expect(response.status).toBe(201);

        expect(response.body.nome).toBe("Monitor Gamer");

    });

});