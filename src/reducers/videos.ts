import { Reducer } from "react";
import { Video } from '../../common/types/schema';
import { SET_VIDEOS, REMOVE_VIDEOS } from "../actions/videos";

export type VideoState = Video[] | null;

export const initialState: VideoState = null;

const videosReducer: any = (state:any = initialState, action:any) => {
	switch (action.type) {
		case SET_VIDEOS:
			return {};
		case REMOVE_VIDEOS:
			return initialState;
		default:
			return state;
	}
}

export default videosReducer;
