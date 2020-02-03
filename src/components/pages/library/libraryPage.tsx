import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import VideoList from './VideoList/VideoList';

interface Props extends RouteComponentProps<{ videoID: string }> {}

export const LibraryPage: React.FC<Props> = ({ match }) => {
	console.log(match);
	return <div>
		Library Page for "{match.params.videoID}"
		<VideoList />
	</div>
}
