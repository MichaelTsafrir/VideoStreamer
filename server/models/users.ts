import mongoose from 'mongoose';
import { userDocument } from '../types';

const Schema = mongoose.Schema;

export const userSchemaData = {
	username:String,
	password:String,
	firstname:String,
	lastname:String,
	email:String
};

export const USER_MODEL = 'user';

// Create schema
export const userSchema = new Schema(userSchemaData);

// Create model
export const userModel = mongoose.model<userDocument>(USER_MODEL, userSchema);
