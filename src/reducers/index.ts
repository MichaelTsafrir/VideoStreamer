import { combineReducers } from 'redux';
import user, { UserState } from './user';
import videos, { VideosState } from './videos';

const rootReducers = combineReducers({
	user,
	videos,
});

export type RootState = {
	user: UserState,
	videos: VideosState,
};

export default rootReducers;
