import request from "supertest";

// Clear BASE_PATH so routes mount at /products (not /ecommerce/products)
process.env.BASE_PATH = "";

// Mock the database pool BEFORE importing app, so the pool never connects to a real DB
jest.mock("../../../database/connection", () => ({
    pool: {
        query: jest.fn()
    }
}));

import app from "../../../main/app";
import { pool } from "../../../database/connection";

const mockQuery = pool.query as jest.Mock;

const sampleProduct = {
    id: "1",
    sku: "INT-SKU-001",
    nome: "Integration Product",
    descricao: "Integration Description",
    preco: 50,
    quantidade: 5,
};

beforeEach(() => {
    jest.clearAllMocks();
});

// ─── POST /products ───────────────────────────────────────────────────────────

describe("POST /products", () => {
    it("should create a product and return 201", async () => {
        // findByCode (SELECT) → no existing product
        mockQuery.mockResolvedValueOnce({ rows: [] });
        // create (INSERT) → returns new product
        mockQuery.mockResolvedValueOnce({ rows: [sampleProduct] });

        const response = await request(app).post("/products").send({
            sku: "INT-SKU-001",
            nome: "Integration Product",
            descricao: "Integration Description",
            preco: 50,
            quantidade: 5,
        });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Produto criado com sucesso");
        expect(response.body.product).toMatchObject({ sku: "INT-SKU-001" });
    });

    it("should return 400 when SKU already registered", async () => {
        // findByCode (SELECT) → existing product
        mockQuery.mockResolvedValueOnce({ rows: [sampleProduct] });

        const response = await request(app).post("/products").send({
            sku: "INT-SKU-001",
            nome: "Integration Product",
            preco: 50,
            quantidade: 5,
        });

        expect(response.status).toBe(400);
        expect(response.body.error.message).toBe("Produto já cadastrado");
    });

    it("should return 400 when required fields are missing (no SKU)", async () => {
        const response = await request(app).post("/products").send({
            nome: "Missing SKU",
            preco: 50,
            quantidade: 5,
        });

        expect(response.status).toBe(400);
        expect(response.body.error.message).toBe("SKU é obrigatório");
    });
});

// ─── GET /products ────────────────────────────────────────────────────────────

describe("GET /products", () => {
    it("should list all products and return 200", async () => {
        mockQuery.mockResolvedValueOnce({ rows: [sampleProduct] });

        const response = await request(app).get("/products");

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Produtos listados com sucesso");
        expect(response.body.products).toHaveLength(1);
        expect(response.body.products[0]).toMatchObject({ sku: "INT-SKU-001" });
    });

    it("should return 404 when no products are found", async () => {
        mockQuery.mockResolvedValueOnce({ rows: [] });

        const response = await request(app).get("/products");

        expect(response.status).toBe(404);
        expect(response.body.error.message).toBe("Nenhum produto encontrado");
    });
});

// ─── GET /products/:sku ───────────────────────────────────────────────────────

describe("GET /products/:sku", () => {
    it("should find a product by SKU and return 200", async () => {
        mockQuery.mockResolvedValueOnce({ rows: [sampleProduct] });

        const response = await request(app).get("/products/INT-SKU-001");

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Produto encontrado com sucesso");
        expect(response.body.product).toMatchObject({ sku: "INT-SKU-001" });
    });

    it("should return 404 when product is not found", async () => {
        mockQuery.mockResolvedValueOnce({ rows: [] });

        const response = await request(app).get("/products/NONEXISTENT");

        expect(response.status).toBe(404);
        expect(response.body.error.message).toBe("Produto não encontrado");
    });
});

// ─── PUT /products/:sku ───────────────────────────────────────────────────────

describe("PUT /products/:sku", () => {
    it("should update a product and return 200", async () => {
        const updatedProduct = { ...sampleProduct, nome: "Updated Name" };
        // findByCode → existing product
        mockQuery.mockResolvedValueOnce({ rows: [sampleProduct] });
        // update → updated product
        mockQuery.mockResolvedValueOnce({ rows: [updatedProduct] });

        const response = await request(app).put("/products/INT-SKU-001").send({
            nome: "Updated Name",
            descricao: "Integration Description",
            preco: 50,
            quantidade: 5,
        });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Produto atualizado com sucesso");
        expect(response.body.product.nome).toBe("Updated Name");
    });

    it("should return 400 when product to update is not found", async () => {
        mockQuery.mockResolvedValueOnce({ rows: [] });

        const response = await request(app).put("/products/NONEXISTENT").send({
            nome: "Updated Name",
            descricao: "Desc",
            preco: 10,
            quantidade: 1,
        });

        expect(response.status).toBe(400);
        expect(response.body.error.message).toBe("Produto não encontrado");
    });
});

// ─── DELETE /products/:sku ────────────────────────────────────────────────────

describe("DELETE /products/:sku", () => {
    it("should delete a product and return 200", async () => {
        // findByCode → existing product
        mockQuery.mockResolvedValueOnce({ rows: [sampleProduct] });
        // deleteByCode → success
        mockQuery.mockResolvedValueOnce({ rows: [] });

        const response = await request(app).delete("/products/INT-SKU-001");

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Produto deletado com sucesso");
        expect(response.body.product).toBe("INT-SKU-001");
    });

    it("should return 404 when product to delete is not found", async () => {
        mockQuery.mockResolvedValueOnce({ rows: [] });

        const response = await request(app).delete("/products/NONEXISTENT");

        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Produto não encontrado");
    });
});
