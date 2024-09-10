export interface GetProductResponseDTO {
    id: string
    name: string
    price: number
    price2?: number
    description?: string
    category: {
        id: string
        name: string
    }
    merchant: {
        id: string
        name: string
    }
    image?: string
    createdAt?: Date
    updatedAt?: Date
}