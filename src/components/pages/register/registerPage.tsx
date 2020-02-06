import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../selectors';
import { RouteComponentProps, Link } from 'react-router-dom';
import Register from './Register/Register';

interface Props extends RouteComponentProps {}

export const RegisterPage: React.FC<Props> = ({ history }) => {
	const user = useSelector(userSelector);
	
	useEffect(() => {
		// Check if user is logged in
		if (user) {
			history.push('/');
		}
	});
	
	return (
		<React.Fragment>
			<Register />
			<Link to='/login' className="login-link">Already a user? <u>Log in</u> now!</Link> 
		</React.Fragment>
	);
};
