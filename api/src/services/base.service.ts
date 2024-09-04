import { ServiceSchema } from 'moleculer';
import { ProjectStatusHandler } from './handlers/projectStatusHandler';
import { productCreateHandler } from './handlers/productCreateHandler';
import { categoryCreateHandler } from './handlers/categoryCreateHandler';

const apiVersion = 'v1';
const projectService: ServiceSchema = {
	name: 'project',
	actions: {
		status: {
			rest: {
				method: 'GET',
				path: `${apiVersion}/status`
			},
			handler: ProjectStatusHandler
		},
		createProduct: {
			rest: {
				method: 'POST',
				path: `${apiVersion}/product`
			},
			handler: productCreateHandler
		},
		createCategory: {
			rest: {
				method: 'POST',
				path: `${apiVersion}/category`
			},
			handler: categoryCreateHandler
		}
	}
};

export default projectService;
