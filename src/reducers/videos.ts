import { Video } from '../common/types';
import { SET_VIDEOS, REMOVE_VIDEOS, VideosActionTypes } from "../actions/videos";

export type VideosState = Video[] | null;

export const initialState: VideosState = null;

const videosReducer = (state = initialState, action: VideosActionTypes): VideosState => {
	switch (action.type) {
		case SET_VIDEOS:
			return action.payload;
		case REMOVE_VIDEOS:
			return initialState;
		default:
			return state;
	}
}

export default videosReducer;
