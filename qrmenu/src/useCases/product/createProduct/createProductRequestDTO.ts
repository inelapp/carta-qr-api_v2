export interface CreateProductRequestDTO {
	name: string;
	description: string;
	price: number;
	price_2?: number;
	categoryId: string;
	merchantId: string;
	image?: string;
	quantity: number;
}
