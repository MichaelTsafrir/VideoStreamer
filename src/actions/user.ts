import { User } from "../../common/types";

export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';

export const setUser = (user: User): SetUserAction => ({
	type: SET_USER,
	payload: user,
});

export const removeUser = (): RemoveUserAction => ({
	type: REMOVE_USER,
});

export interface SetUserAction {
	type: typeof SET_USER,
	payload: User,
}

export interface RemoveUserAction {
	type: typeof REMOVE_USER,
}

export type UserActionTypes = SetUserAction | RemoveUserAction;