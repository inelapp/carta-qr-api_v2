import { v4 as uuid } from 'uuid';

export interface CategoryProps {
	id?: string;
	name: string;
	description: string;
	active: boolean | null;
	createdAt: Date | null;
	updatedAt: Date | null;
}

export class Category {
	readonly id: string;

	readonly props: CategoryProps;

	constructor(props: CategoryProps, id?: string) {
		this.id = id || uuid();
		this.props = props;
	}

	get name() {
		return this.props.name;
	}

	get description() {
		return this.props.description;
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

	set name(name: string) {
		this.props.name = name;
	}

	set description(description: string) {
		this.props.description = description;
	}

	set active(active: boolean | null) {
		this.props.active = active;
	}

	set createdAt(createdAt: Date | null) {
		this.props.createdAt = createdAt;
	}

	set updatedAt(updatedAt: Date | null) {
		this.props.updatedAt = updatedAt;
	}

	static create(props: CategoryProps, id?: string) {
		return new Category(props, id);
	}
}
