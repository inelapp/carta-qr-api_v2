export interface UpdateProductRequestDTO {
    id: string;
    merchantId: string;
    name: string;
    price: number;
    price_2?: number;
    categoryId: string;
    description?: string;
    image?: string;
    quantity: number;
}