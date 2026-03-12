export interface BatchCreateProductDTO {
    produtos: {
        sku: string;
        nome: string
        descricao?: string
        preco: number
        quantidade: number
    }[];
}