import * as mongoose from 'mongoose';

export interface User {
	username: String,
	password: String,
	firstname: String,
	lastname: String,
	email: String
}

export interface Video {
	name: String,
	description: String,
	url: String,
	byUser: mongoose.Types.ObjectId,
	addDate: Date,
}