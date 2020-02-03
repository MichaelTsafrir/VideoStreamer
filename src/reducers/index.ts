import { combineReducers } from 'redux';
import user from './user';
import videos from './videos';

const rootReducers = combineReducers({
	user,
	videos,
});

export type RootState = ReturnType<typeof rootReducers>;

export default rootReducers;
