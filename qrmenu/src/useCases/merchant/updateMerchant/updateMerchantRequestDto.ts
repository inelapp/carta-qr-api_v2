export interface UpdateMerchantRequestDto {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    merchantCode: string;
    active: boolean;
}