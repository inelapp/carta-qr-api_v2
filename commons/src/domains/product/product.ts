import { v4 as uuid } from 'uuid';
export interface ProductProps {
	id?: string;
	name: string;
	price: number;
	categoryId: string;
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

	get image(): string | undefined {
		return this.props.image;
	}

	get quantity(): number {
		return this.props.quantity;
	}

	get createdAt(): Date | undefined {
		return this.props.createdAt;
	}

	get updatedAt(): Date | undefined {
		return this.props.updatedAt;
	}

	static create(props: ProductProps, id?: string): Product {
		return new Product(props, id);
	}
}
