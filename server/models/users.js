const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchemaData = {
	username:String,
	password:String,
	firstname:String,
	lastname:String,
	email:String
};

const USER_MODEL = 'user';

// Create schema
const userSchema = Schema(userSchemaData);

// Create model
const User = mongoose.model(USER_MODEL, userSchema);

module.exports = {
	USER_MODEL: USER_MODEL,
	userSchemaData: userSchemaData,
	User: User,
};