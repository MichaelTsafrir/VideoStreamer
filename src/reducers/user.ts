import { User } from '../common/types'; 
import { SET_USER, REMOVE_USER, UserActionTypes } from "../actions/user";

export type UserState = User | null;

export const initialState: UserState = null; 

const userReducer = (state = initialState, action: UserActionTypes): UserState => {
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