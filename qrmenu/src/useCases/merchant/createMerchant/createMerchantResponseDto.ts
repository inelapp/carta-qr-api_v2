export interface CreateMerchantResponseDto {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    password: string;
    merchantCode: string;
    active: boolean;
    createdAt?: Date | null;
    updatedAt?: Date | null;
}