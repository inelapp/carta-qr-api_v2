export interface GetCategoryRequestDto {
    id: string;
    merchantId?: string;
    merchantCode: string
    name?: string;
    active?: boolean;
}