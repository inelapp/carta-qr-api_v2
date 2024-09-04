import { Service } from 'moleculer';
import { mongoConnections } from '@service/commons/dist/src/config/mongo-connections';

type ProjectThis = Service;

async function ProjectStatusHandler(this: ProjectThis) {
	const mongoConnection = await mongoConnections.default;
	return {
		service: 'api',
		message: 'success :)',
		mongoConnection: mongoConnection.connection.name
	};
}

export { ProjectStatusHandler };
