export interface CreateProductDTO {
    sku: string;
    nome: string
    descricao?: string
    preco: number
    quantidade: number
}