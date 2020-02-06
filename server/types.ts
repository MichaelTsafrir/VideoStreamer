import mongoose from 'mongoose';

export interface userDocument extends mongoose.Document {
	username: string,
	firstname: string,
	lastname: string,
	email: string,
}

export interface videoDocument extends mongoose.Document {
	name: string,
	description: string,
	url: string,
	byUser: string,
	addDate: Date,
}