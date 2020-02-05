import mongoose from 'mongoose';

export interface User {
	id: String,
	username: String,
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