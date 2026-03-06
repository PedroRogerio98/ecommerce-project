import { pool } from "../../../database/connection";
import { CreateProductDTO } from "../dto/CreateProductDTO";
import { IProductRepository } from "./IProductRepository";

export class ProductRepository implements IProductRepository {

  async create(data: CreateProductDTO) {

    const query = `
      INSERT INTO products (nome, descricao, preco)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    const values = [
      data.nome,
      data.descricao,
      data.preco
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
  }

}