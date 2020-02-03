import React from 'react';
import axios from 'axios';
import { removeUser } from '../../../../actions/user';
import { useDispatch } from 'react-redux';

interface Props {};

const Logout: React.FC<Props> = () => {
	const dispatch = useDispatch();

	const onLogOut = async (e: React.SyntheticEvent) => {
		e.preventDefault();

		const res = await axios.post('http://localhost:3001/logOut');
		const { error, status } = res.data;

		if (status === "ok") {
			dispatch(removeUser());
		}
		else {
			// Couldn't log out, log event
			console.log(error);
		}
	};

	return (
		<input type="button" onClick={onLogOut} value="Log Out" />
	);
};

export default Logout;