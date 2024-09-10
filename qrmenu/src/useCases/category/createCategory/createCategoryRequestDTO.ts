export interface CreateCategoryRequestDTO {
	name: string;
	description: string;
	merchantId: string;
	merchantCode: string;
	active?: boolean | null;
}
