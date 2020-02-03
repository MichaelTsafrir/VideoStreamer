import React from 'react';
import { Link } from 'react-router-dom';
import './loginPage.css';
import Login from './login/login';

interface Props {}

export const LoginPage: React.FC<Props> = () => {
	return (
		<div>
			<Login />
			<Link to='/register' className="register-link">Not a user? <u>Register</u> now!</Link> 
		</div>
	)
}
