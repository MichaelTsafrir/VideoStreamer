import React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';

interface Props extends RouteComponentProps {}

// Redirect to Login Page
// history.push('/login');


export const HomePage: React.FC<Props> = ({ history }) => {
	return <div>
		Home Page
		<Link to='/library'>library</Link> 
	</div>
}
