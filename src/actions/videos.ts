import { Video } from "../../common/types/schema";


export const SET_VIDEOS = 'SET_VIDEOS';
export const REMOVE_VIDEOS = 'REMOVE_VIDEOS';

export const setVideos = (videos: Video[]) => ({
	type: SET_VIDEOS,
	payload: videos,
});

export const removeVideos = () => ({
	type: REMOVE_VIDEOS,
})