export interface ICategoryDb {
    _id?: string;
    name: string;
    description: string;
    merchantId: string;
    active?: boolean | null;
    createdAt?: Date;
    updatedAt?: Date;
}