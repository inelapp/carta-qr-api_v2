import { ServiceSchema } from 'moleculer';
import { ProjectStatusHandler } from './handlers/projectStatusHandler';
import { productCreateHandler } from './handlers/productCreateHandler';
import { categoryCreateHandler } from './handlers/categoryCreateHandler';
import { categoriesGetHandler } from './handlers/categoriesGetHandler';
import { merchantCreateHandler } from './handlers/merchantCreateHandler';
import { categoryGetHandler } from './handlers/categoryGetHandler';
import { categoryUpdateHandler } from './handlers/categoryUpdateHandler';
import { merchantsGetHandler } from './handlers/merchantsGetHandler';
import { merchantGetHandler } from './handlers/merchantGetHandler';
import { merchantUpdateHandler } from './handlers/merchantUpdateHandler';

const apiVersion = 'v1';
const qrmenuService: ServiceSchema = {
	name: 'qrmenu',
	actions: {
		status: {
			rest: {
				method: 'GET',
				path: `${apiVersion}/status`
			},
			handler: ProjectStatusHandler
		},
		createMerchant: {
			rest: {
				method: 'POST',
				path: `${apiVersion}/merchants`
			},
			handler: merchantCreateHandler
		},
		getMerchants: {
			rest: {
				method: 'GET',
				path: `${apiVersion}/merchants`
			},
			handler: merchantsGetHandler
		},
		getMerchant: {
			rest: {
				method: 'GET',
				path: `${apiVersion}/merchants/:id`
			},
			handler: merchantGetHandler
		},
		updateMerchant:{
			rest: {
				method: 'PATCH',
				path: `${apiVersion}/merchants/:id`
			},
			handler: merchantUpdateHandler
		},
		createProduct: {
			rest: {
				method: 'POST',
				path: `${apiVersion}/products`
			},
			handler: productCreateHandler
		},
		createCategory: {
			rest: {
				method: 'POST',
				path: `${apiVersion}/categories`
			},
			handler: categoryCreateHandler
		},
		getCategories: {
			rest: {
				method: 'GET',
				path: `${apiVersion}/categories`
			},
			handler: categoriesGetHandler
		},
		getCategory: {
			rest: {
				method: 'GET',
				path: `${apiVersion}/categories/:id`
			},
			handler: categoryGetHandler
		},
		categoryUpdateHandler: {
			rest: {
				method: 'PATCH',
				path: `${apiVersion}/categories/:id`
			},
			handler: categoryUpdateHandler
		}
	}
};

export default qrmenuService;
