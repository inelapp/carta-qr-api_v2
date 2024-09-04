import type { ServiceSchema } from 'moleculer';
import type { ApiSettingsSchema } from 'moleculer-web';
import ApiGateway from 'moleculer-web';

const ApiService: ServiceSchema<ApiSettingsSchema> = {
	name: 'api',
	mixins: [ApiGateway],
	settings: {
		port: process.env.PORT != null ? Number(process.env.PORT) : 3001,
		ip: '0.0.0.0',
		use: [],
		routes: [
			{
				path: '/',
				whitelist: ['project.*'],
				mergeParams: true,
				autoAliases: true,
				bodyParsers: {
					json: {
						strict: false,
						limit: '1MB'
					},
					urlencoded: {
						extended: true,
						limit: '1MB'
					}
				},
				mappingPolicy: 'all',
				logging: true,
				use: [
					function (req: any, res: any, next: () => void) {
						req.$ctx.meta.$requestHeaders = req.headers;
						next();
					}
				]
			}
		],
		cors: {
			origin: ['*'],
			methods: ['GET', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
			credentials: true,
			maxAge: 3600
		},
		log4XXResponses: false,
		logRequestParams: null,
		logResponseData: null
	}
};

export default ApiService;
