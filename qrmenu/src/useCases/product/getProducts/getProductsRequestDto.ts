export interface GetProductsRequestDTO {
    // page: number;
    // limit: number;
    // search?: string;
    category?: string;
    // sort?: string;
    // order?: string;
    merchantId: string;
    categoryId?: string;
    name?: string;
    active?: boolean;
}