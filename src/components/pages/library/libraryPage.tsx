import React, { useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import VideoList from './VideoList/VideoList';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../selectors';
import Player from './Player/Player';
import './LibraryPage.scss';

interface Props extends RouteComponentProps<{ videoID: string }> {}

export const LibraryPage: React.FC<Props> = ({ match, history }) => {
	const user = useSelector(userSelector);
	
	useEffect(() => {
		// Check if user is logged in
		if (!user) {
			history.push('/login');
		}
	});
	
	console.log(match);
	return <div>
		Library Page for "{match.params.videoID}"
		<div className="video-container">
			<VideoList />
			<Player />
		</div>
		<Link to='/'>Go Home</Link>
	</div>
}
