import React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../selectors';
import Header from './Header/Header';

interface Props extends RouteComponentProps {}

export const HomePage: React.FC<Props> = ({ history }) => {
	const user = useSelector(userSelector);
	
	// Check if user is logged in
	if (!user) {
		history.push('/login');
	}

	return <div>
		{ user && <Header user={user} />}
		<Link to='/library'>library</Link> 
	</div>
}
