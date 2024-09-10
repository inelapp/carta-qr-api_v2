import { err, ok, Result } from 'neverthrow';
import { v4 as uuid } from 'uuid';
import { validateProductSchema } from './product.validation';

export interface ProductProps {
	id?: string;
	name: string;
	price: number;
	price_2?: number;
	categoryId: string;
	merchantId: string;
	description?: string;
	image?: string;
	quantity: number;
	createdAt?: Date;
	updatedAt?: Date;
}

export class Product {
	readonly id: string;

	readonly props: ProductProps;

	constructor(props: ProductProps, id?: string) {
		this.id = id || uuid();
		this.props = props;
	}

	get name(): string {
		return this.props.name;
	}

	get price(): number {
		return this.props.price;
	}

	get categoryId(): string {
		return this.props.categoryId;
	}

	get description(): string | undefined {
		return this.props.description;
	}

	get merchantId(): string {
		return this.props.merchantId;
	}

	get image(): string | undefined {
		return this.props.image;
	}

	get createdAt(): Date | undefined {
		return this.props.createdAt;
	}

	get updatedAt(): Date | undefined {
		return this.props.updatedAt;
	}

	get price_2(): number | undefined {
		return this.props.price_2;
	}

	get quantity(): number {
		return this.props.quantity;
	}

	static create(props: ProductProps): Result<Product, string> {
		const { error } = validateProductSchema(props);
		if(error) {
			const productErrors = error.details.map((error) => error.message).join(', ');
			return err(productErrors);	
		}
		return ok(new Product(props));
	}
}
