export interface GetCategoryResponseDto {
    id: string;
    name: string;
    description: string;
    merchant: {
        id: string;
        name: string;
        merchantCode: string;
    };
    active: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}