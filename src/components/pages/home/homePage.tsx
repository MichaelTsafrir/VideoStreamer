import React, { useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelector } from 'selectors';
import Header from './Header/Header';
import AddVideo from './AddVideo/AddVideo';

interface Props extends RouteComponentProps {}

export const HomePage: React.FC<Props> = ({ history }) => {
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
			<AddVideo />
			<Link to='/library'>Show Library</Link> 
		</React.Fragment>
	);
}
