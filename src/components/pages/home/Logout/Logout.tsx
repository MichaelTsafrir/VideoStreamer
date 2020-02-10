import React from 'react';
import axios from 'axios';
import { removeUser } from 'actions/user';
import { useDispatch } from 'react-redux';
import { removeVideos } from 'actions/videos';

import LogOutButton from 'images/logout-button.png';
import './Logout.scss';
import { serverAddress } from 'common/common';

interface Props {};

const Logout: React.FC<Props> = () => {
	const dispatch = useDispatch();

	const handleLogOut = async (e: React.MouseEvent) => {
		e.preventDefault();

		// Send server log out request
		const res = await axios.post(`${serverAddress}/logOut`, undefined, { withCredentials: true });
		const { error, status } = res.data;

		if (status === "ok") {
			// Remove data from redux
			dispatch(removeVideos());
			dispatch(removeUser());
		}
		else {
			// Couldn't log out, log event
			console.log(error);
		}
	};

	return (
		<img className="logout-button" src={LogOutButton} onClick={handleLogOut} alt="Log Out" title="Log Out" />
	);
};

export default Logout;