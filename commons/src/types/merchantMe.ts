export interface IMerchantMeResponse {
    success: boolean;
    data: {
        id: string;
        name: string;
        email: string;
        merchantCode: string;
        address: string;
        phone: string;
        active: boolean;
    }
}