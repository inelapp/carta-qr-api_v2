import { err, ok, Result } from "neverthrow";
import { validateMerchant } from "./merchant.validation";

export interface IMerchantProps {
    id?: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    password: string;
    merchantCode: string;
    active: boolean;
    createdAt?: Date | null;
    updatedAt?: Date | null;
}

export class Merchant {
    readonly id: string;
    readonly props: IMerchantProps;

    constructor(props: IMerchantProps) {
        this.props = props;
    }

    get name(): string {
        return this.props.name;
    }

    get phone(): string {
        return this.props.phone;
    }

    get password(): string {
        return this.props.password;
    }

    get email(): string {
        return this.props.email;
    }

    get address(): string {
        return this.props.address;
    }

    get merchantCode(): string {
        return this.props.merchantCode;
    }

    get active(): boolean {
        return this.props.active;
    }

    get createdAt(): Date | null | undefined {
        return this.props.createdAt;
    }

    get updatedAt(): Date | null | undefined {
        return this.props.updatedAt
    }

    static create(props: IMerchantProps): Result<Merchant, string> {
        const { error } = validateMerchant(props);
        if(error) {
            const merchantErrors = error.details.map((error) => error.message).join(". ");
            return err(merchantErrors)
        }
        return ok(new Merchant(props));
    }
}