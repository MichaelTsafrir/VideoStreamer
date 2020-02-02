import React from 'react';
import { Link } from 'react-router-dom';

interface Props {}

export const LoginPage: React.FC<Props> = () => {
	return (
		<div>
			Login Page
			<Link to='/register'>Register</Link>
		</div>
	)
}
