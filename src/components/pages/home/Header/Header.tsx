import React from 'react';
import { User } from 'common/types';
import './Header.scss';
import Logout from '../Logout/Logout';

interface Props {
	user: User;
};

const Header: React.FC<Props> = (props) => {
	return (
		<div className='username-header'>
			<label className="username-label">{props.user.username}</label>
			<Logout /> 
		</div>
	);
};

export default Header;
