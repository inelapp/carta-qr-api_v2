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
import { checkMerchantCodeInRoute } from '@service/commons/dist/src/shared';
import { productGetHandler } from './handlers/productGetHandler';
import { productsGetHandler } from './handlers/productsGetHandler';
import { productUpdateHandler } from './handlers/productUpdateHandler';

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
				path: `${apiVersion}/:merchantCode?/products`
			},
			handler: productCreateHandler,
			hooks: {
				before: [checkMerchantCodeInRoute]
			}
		},
		getProduct: {
			rest: {
				method: 'GET',
				path: `${apiVersion}/:merchantCode/products/:id`
			},
			handler: productGetHandler,
			hooks: {
				before: [checkMerchantCodeInRoute]
			}
		},
		getProducts: {
			rest: {
				method: 'GET',
				path: `${apiVersion}/:merchantCode/products`
			},
			handler: productsGetHandler,
			hooks: {
				before: [checkMerchantCodeInRoute]
			}
		},
		updateProduct: {
			rest: {
				method: 'PATCH',
				path: `${apiVersion}/:merchantCode/products/:id`
			},
			handler: productUpdateHandler,
			hooks: {
				before: [checkMerchantCodeInRoute]
			}
		},
		createCategory: {
			rest: {
				method: 'POST',
				path: `${apiVersion}/:merchantCode/categories`
			},
			handler: categoryCreateHandler,
			hooks: {
				before: [checkMerchantCodeInRoute]
			}
		},
		getCategories: {
			rest: {
				method: 'GET',
				path: `${apiVersion}/:merchantCode/categories`
			},
			handler: categoriesGetHandler,
			hooks: {
				before: [checkMerchantCodeInRoute]
			}
		},
		getCategory: {
			rest: {
				method: 'GET',
				path: `${apiVersion}/:merchantCode/categories/:id`
			},
			handler: categoryGetHandler,
			hooks: {
				before: [checkMerchantCodeInRoute]
			}
		},
		updateCategory: {
			rest: {
				method: 'PATCH',
				path: `${apiVersion}/:merchantCode/categories/:id`
			},
			handler: categoryUpdateHandler,
			hooks: {
				before: [checkMerchantCodeInRoute]
			}
		}
	}
};

export default qrmenuService;
