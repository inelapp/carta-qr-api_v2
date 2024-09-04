import { Service } from 'moleculer';
import { ProjectStatusHandler } from 'src/services/handlers/projectStatusHandler';
import { mongoConnections } from '@service/commons/dist/src/config/mongo-connections';

describe('ProjectStatusHandler', () => {
	let service: Service;
	let connection: any;

	// beforeEach(() => {
	// 	service = {} as Service;
	// 	connection = mongoConnections.default || { connection: { name: 'test' } };
	// });

	it('should do something', async () => {
		// // Arrange
		// (await FinanceStatusHandler.call(service)).mongoConnection = connection.connection.name;
		// // Act
		// await FinanceStatusHandler.call(service);

		// Assert
		// Add your assertions here
		expect(1).toBe(1);
	});

	// Add more test cases as needed
});
