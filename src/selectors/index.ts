import { RootState } from '../reducers/';
import { User } from '../../common/types/schema';

export const userSelector = (state: RootState) => state.user;
export const videosSelector = (state: RootState) => state.videos;
