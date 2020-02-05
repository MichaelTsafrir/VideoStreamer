import mongoose from 'mongoose';

export interface User {
	id: string,
	username: string,
	firstname: string,
	lastname: string,
	email: string
}

export interface Video {
	id: string,
	name: string,
	description: string,
	url: string,
	byUser: mongoose.Types.ObjectId,
	addDate: Date,
}