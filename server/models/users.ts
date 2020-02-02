import mongoose from 'mongoose';
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
export const userModel = mongoose.model(USER_MODEL, userSchema);
