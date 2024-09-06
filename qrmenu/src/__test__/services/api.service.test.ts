// import ApiService from ''

import ApiService from 'src/services/api.service';

describe('ApiService', () => {
	it('should have the correct name', () => {
		expect(ApiService.name).toBe('api');
	});

	it('should have the correct port', () => {
		expect(ApiService!.settings!.port).toBe(process.env.PORT != null ? Number(process.env.PORT) : 3001);
	});

	it('should have the correct IP', () => {
		expect(ApiService!.settings!.ip).toBe('0.0.0.0');
	});

	it('should have the correct whitelist', () => {
		expect(ApiService!.settings!.routes![0].whitelist).toEqual(['base.*']);
	});

	it('should have the correct CORS settings', () => {
		expect(ApiService!.settings!.cors!.origin).toEqual(['*']);
		expect(ApiService!.settings!.cors!.methods).toEqual(['GET', 'OPTIONS', 'POST', 'PUT', 'DELETE']);
		expect(ApiService?.settings?.cors?.credentials).toBe(true);
		expect(ApiService!.settings!.cors!.maxAge).toBe(3600);
	});

	it('should have logging enabled', () => {
		expect(ApiService!.settings!.routes![0].logging).toBe(true);
	});
});
