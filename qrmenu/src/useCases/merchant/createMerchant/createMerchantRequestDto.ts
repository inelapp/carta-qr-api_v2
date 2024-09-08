export interface CreateMerchantRequestDto {
    name: string;
    email: string;
    phone: string;
    address: string;
    merchantCode: string;
    active: boolean;
}