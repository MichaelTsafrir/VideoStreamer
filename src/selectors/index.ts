import { RootState } from '../reducers/';

export const userSelector = (state: RootState) => state.user;
export const videosSelector = (state: RootState) => state.videos;
