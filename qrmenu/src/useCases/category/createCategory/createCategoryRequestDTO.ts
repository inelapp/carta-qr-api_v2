export interface CreateCategoryRequestDTO {
	name: string;
	description: string;
	merchantId: string;
	active?: boolean | null;
}
