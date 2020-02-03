import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../selectors';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {}

export const RegisterPage: React.FC<Props> = ({ history }) => {
	const user = useSelector(userSelector);

	// Check if user is logged in
	if (user) {
		history.push('/');
	}
	
	return <div>Register Page</div>
}
