import { connect } from 'mongoose';
import 'dotenv/config';

export const { MONGO_URI } = process.env;

export const mongoConnections = {
	default: connect(MONGO_URI!)
};
