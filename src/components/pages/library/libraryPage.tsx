import React, { useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import VideoList from './VideoList/VideoList';
import { useSelector } from 'react-redux';
import { userSelector } from 'selectors';
import Player from './Player/Player';
import './LibraryPage.scss';
import Header from '../home/Header/Header';
import Container from 'components/Container/Container';

interface Props extends RouteComponentProps<{ videoID: string }> {}

export const LibraryPage: React.FC<Props> = ({ match, history }) => {
	const user = useSelector(userSelector);
	
	useEffect(() => {
		// Check if user is logged in
		if (!user) {
			history.push('/login');
		}
	});
	
	return (
		<React.Fragment>
			{ user && <Header user={user} /> }
			<div className="video-container">
				<VideoList />
				<div className="player-container">
					<Container>
						{ match.params.videoID && <Player videoID={match.params.videoID} /> }
					</Container>
					<Link to='/'>Add new video</Link>
				</div>
			</div>
		</React.Fragment>
	);
}
