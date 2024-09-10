export interface CreateProductResponseDTO {
	id: string;
	name: string;
	description?: string;
	price: number;
	categoryId: string;
	merchantId: string;
	image?: string;
	createdAt?: Date | null;
	updatedAt?: Date | null;
}
