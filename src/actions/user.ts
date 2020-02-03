import { User } from "../../common/types/schema";

export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';

export const setUser = (user: User) => ({
	type: SET_USER,
	payload: user,
});

export const removeUser = () => ({
	type: REMOVE_USER,
});
