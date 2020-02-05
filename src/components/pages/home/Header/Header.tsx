import React from 'react';
import { User } from '../../../../../common/types';
import './Header.scss';
import Logout from './Logout';

interface Props {
	user: User;
};

const Header: React.FC<Props> = (props) => {
	return (
		<div className='home-header'>
			Welcome, {props.user.firstname}
			<Logout /> 
		</div>
	);
};

export default Header;
