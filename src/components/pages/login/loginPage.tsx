import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import Login from './login/login';
import { useSelector } from 'react-redux';
import { userSelector } from 'selectors';

interface Props extends RouteComponentProps {}

export const LoginPage: React.FC<Props> = ({ history }) => {
	const user = useSelector(userSelector);
	
	useEffect(() => {
		// Check if user is logged in
		if (user) {
			history.push('/');
		}
	});
	
	return (
		<React.Fragment>
			<Login />
			<Link to='/register' className="register-link">Not a user? <u>Register</u> now!</Link> 
		</React.Fragment>
	);
};
