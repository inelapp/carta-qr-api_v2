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
import { authenticateAndAuthorizeAll } from '@service/commons/dist/src/shared';
import { productGetHandler } from './handlers/productGetHandler';
import { productsGetHandler } from './handlers/productsGetHandler';
import { productUpdateHandler } from './handlers/productUpdateHandler';
import { merchantGetMeHandler } from './handlers/merchantGetMeHandler';
import { merchantSignMeHandler } from './handlers/merchantSignHandler';

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
			handler: productCreateHandler,
			hooks: {
				before: [authenticateAndAuthorizeAll]
			}
		},
		getProduct: {
			rest: {
				method: 'GET',
				path: `${apiVersion}/products/:id`
			},
			handler: productGetHandler,
			hooks: {
				before: [authenticateAndAuthorizeAll]
			}
		},
		getProducts: {
			rest: {
				method: 'GET',
				path: `${apiVersion}/products`
			},
			handler: productsGetHandler,
			hooks: {
				before: [authenticateAndAuthorizeAll]
			}
		},
		updateProduct: {
			rest: {
				method: 'PATCH',
				path: `${apiVersion}/products/:id`
			},
			handler: productUpdateHandler,
			hooks: {
				before: [authenticateAndAuthorizeAll]
			}
		},
		createCategory: {
			rest: {
				method: 'POST',
				path: `${apiVersion}/categories`
			},
			handler: categoryCreateHandler,
			hooks: {
				before: [authenticateAndAuthorizeAll]
			}
		},
		getCategories: {
			rest: {
				method: 'GET',
				path: `${apiVersion}/categories`
			},
			handler: categoriesGetHandler,
			hooks: {
				before: [authenticateAndAuthorizeAll]
			}
		},
		getCategory: {
			rest: {
				method: 'GET',
				path: `${apiVersion}/categories/:id`
			},
			handler: categoryGetHandler,
			hooks: {
				before: [authenticateAndAuthorizeAll]
			}
		},
		updateCategory: {
			rest: {
				method: 'PATCH',
				path: `${apiVersion}/categories/:id`
			},
			handler: categoryUpdateHandler,
			hooks: {
				before: [authenticateAndAuthorizeAll]
			}
		},
		merchantGetMe: merchantGetMeHandler,
		merchantSign: {
			rest: {
				method: 'POST',
				path: `${apiVersion}/merchants/sign`
			},
			handler: merchantSignMeHandler
		}
	}
};

export default qrmenuService;
