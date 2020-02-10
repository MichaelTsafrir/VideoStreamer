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
	byUser: string,
	addDate: Date,
}