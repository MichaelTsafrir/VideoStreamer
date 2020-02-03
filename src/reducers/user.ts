import { Reducer } from "react";
import { User } from '../../common/types/schema'; 
import { SET_USER, REMOVE_USER } from "../actions/user";

export type UserState = User | null;

export const initialState: UserState = null; 

const userReducer: any = (state:any = initialState, action:any) => {
	switch(action.type) {
		case SET_USER:
			return action.payload;
		case REMOVE_USER:
			return initialState;
		default:
			return state;
	}
}

export default userReducer;