import { pool } from "../../../database/connection";
import { CreateProductDTO } from "../dto/CreateProductDTO";
import { DeleteProductByCodeDTO } from "../dto/DeleteProductByCodeDTO";
import { FindProductByCodeDTO } from "../dto/FindProductByCodeDTO";
import { UpdateProductDTO } from "../dto/UpdateProductDTO";
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

  async list() {
    const query = `
      SELECT * FROM products
    `;

    const result = await pool.query(query);

    return result.rows;
  }

  async deleteByCode(data: DeleteProductByCodeDTO) {
    const query = `
      DELETE FROM products
      WHERE sku = $1
    `;

    const values = [data.sku];

    await pool.query(query, values);
  }

  async update(data: UpdateProductDTO) {
    const query = `
      UPDATE products
      SET nome = $1, descricao = $2, preco = $3, quantidade = $4, updated_at = NOW()
      WHERE sku = $5
      RETURNING *
    `;

    const values = [
      data.nome,
      data.descricao,
      data.preco,
      data.quantidade,
      data.sku
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
  }

  async batchCreate(data: CreateProductDTO[]) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const createdProducts: any[] = [];
      for (const product of data) {
        const query = `
          INSERT INTO products (sku, nome, descricao, preco, quantidade)
          VALUES ($1, $2, $3, $4, $5)
          ON CONFLICT (sku) DO UPDATE
          SET nome = $2, descricao = $3, preco = $4, quantidade = $5, updated_at = NOW()
          RETURNING *
        `;
        const values = [
          product.sku,
          product.nome,
          product.descricao,
          product.preco,
          product.quantidade
        ];
        const result = await client.query(query, values);
        createdProducts.push(result.rows[0]);
      }

      await client.query('COMMIT');
      return createdProducts;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

}