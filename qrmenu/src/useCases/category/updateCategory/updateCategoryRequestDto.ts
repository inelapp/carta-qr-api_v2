export interface UpdateCategoryRequestDto {
    id: string;
    name: string;
    description: string;
    active: boolean;
    merchantId: string;
}