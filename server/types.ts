import mongoose from 'mongoose';

export interface userDocument extends mongoose.Document {
	username: String,
	firstname: String,
	lastname: String,
	email: String,
}

export interface videoDocument extends mongoose.Document {
	name: String,
	description: String,
	url: String,
	byUser: mongoose.Types.ObjectId,
	addDate: Date,
}