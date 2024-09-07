export interface CreateCategoryResponseDTO {
	id: string;
	name: string;
	description: string;
	merchantId: string;
	active?: boolean | null;
	createdAt?: Date | null;
	updatedAt?: Date | null;
}
