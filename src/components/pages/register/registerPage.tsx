import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../selectors';
import { RouteComponentProps, Link } from 'react-router-dom';
import Register from './Register/Register';

interface Props extends RouteComponentProps {}

export const RegisterPage: React.FC<Props> = ({ history }) => {
	const user = useSelector(userSelector);

	// Check if user is logged in
	if (user) {
		history.push('/');
	}
	
	return (
		<div>
			<Register />
			<Link to='/login' className="login-link">Already a user? <u>Log in</u> now!</Link> 
		</div>
	);
};
