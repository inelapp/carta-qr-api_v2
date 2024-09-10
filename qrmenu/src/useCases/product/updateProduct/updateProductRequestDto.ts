export interface UpdateProductRequestDTO {
    id: string;
    merchantCode: string;
    name: string;
    price: number;
    price_2?: number;
    categoryId: string;
    description?: string;
    image?: string;
    quantity: number;
}