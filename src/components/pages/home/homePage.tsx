import React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelector, videosSelector } from '../../../selectors';

interface Props extends RouteComponentProps {}

export const HomePage: React.FC<Props> = ({ history }) => {
	const user = useSelector(userSelector);
	const videos = useSelector(videosSelector);

	// Check if user is logged in
	if (!user) {
		history.push('/login');
	}

	console.log(user, !user, !undefined);
	console.log(user, videos);
	return <div>
		Home Page
		<Link to='/library'>library</Link> 
	</div>
}
