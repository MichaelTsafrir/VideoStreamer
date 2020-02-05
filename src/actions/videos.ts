import { Video } from "../../common/types";


export const SET_VIDEOS = 'SET_VIDEOS';
export const REMOVE_VIDEOS = 'REMOVE_VIDEOS';

export const setVideos = (videos: Video[]): SetVideosAction => ({
	type: SET_VIDEOS,
	payload: videos,
});

export const removeVideos = () => ({
	type: REMOVE_VIDEOS,
})

export interface SetVideosAction {
	type: typeof SET_VIDEOS,
	payload: Video[],
}

export interface RemoveVideosAction {
	type: typeof REMOVE_VIDEOS,
}

export type VideosActionTypes = SetVideosAction | RemoveVideosAction;