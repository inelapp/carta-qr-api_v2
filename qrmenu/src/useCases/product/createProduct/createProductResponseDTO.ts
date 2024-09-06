export interface CreateProductResponseDTO {
	id: string;
	name: string;
	description: string;
	price: number;
	category: string;
	quantity: number;
	createdAt: Date;
	updatedAt: Date;
}
