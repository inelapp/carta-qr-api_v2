import { err, ok, Result } from "neverthrow";
import { validateCategorySchema } from "./category.validation";

export interface CategoryProps {
	id?: string;
	name: string;
	description: string;
	merchantId: string;
	active?: boolean | null;
	createdAt?: Date | null;
	updatedAt?: Date | null;
}

export class Category {
	readonly id: string;

	readonly props: CategoryProps;

	constructor(props: CategoryProps) {
		this.props = props;
	}

	get name() {
		return this.props.name;
	}

	get description() {
		return this.props.description;
	}

	get merchantId() {
		return this.props.merchantId;
	}

	get active() {
		return this.props.active;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	static create(props: CategoryProps): Result<Category, string> {
		const { error } = validateCategorySchema(props);
		if(error) {
			const categoryErrors = error.details.map((error) => error.message).join(". ");
			return err(categoryErrors)
		}
		return ok(new Category(props));
	}
}
