import { pool } from "../../../database/connection";
import { CreateProductDTO } from "../dto/CreateProductDTO";
import { FindProductByCodeDTO } from "../dto/FindProductByCodeDTO";
import { IProductRepository } from "./IProductRepository";

export class ProductRepository implements IProductRepository {

  async create(data: CreateProductDTO) {

    const query = `
      INSERT INTO products (sku, nome, descricao, preco, quantidade)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const values = [
      data.sku,
      data.nome,
      data.descricao,
      data.preco,
      data.quantidade
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
  }

  async findByCode(data: FindProductByCodeDTO) {
    const query = `
      SELECT * FROM products
      WHERE sku = $1
    `;

    const values = [data.sku];

    const result = await pool.query(query, values);

    return result.rows[0];
  }

}