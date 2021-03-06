import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from 'actions/user';
import './login.scss';
import Container from 'components/Container/Container';
import { serverAddress } from 'common/common';

interface Props {}

const Login: React.FC<Props> = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const dispatch = useDispatch();

	// Handle the login event
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!username || ! password) {
			return setError('Please enter username and password');
		}
		else {
			try {
				// Fetch user with current credentials
				const res = await axios.post(`${serverAddress}/auth`, { username, password }, { withCredentials: true });
				const { error, user } = res.data;

				if (error) { 
					setError(error);
				}
				else if(!user) {
					setError('Wrong username or password');
				}
				else {
					// User Connected Successfuly
					dispatch(setUser(user));
				}
			}
			catch(err) {
				console.log(err);
				setError('Client couldn\'t connect to server');
			}
		}
	}
	return (
		<Container>
			<form onSubmit={handleSubmit}>
				<table className="login-fields">
					<tbody>
						<tr>
							<td>Username</td>
							<td><input type="text" value={username} onChange={e => setUsername(e.target.value)} /></td>
						</tr>
						<tr>
							<td>Password</td>
							<td><input type="password" value={password} onChange={e => setPassword(e.target.value)} /></td>
						</tr>
						<tr>
							<td></td>
							<td><input type="submit" value="Login" /></td>
						</tr>
						{ error ?
						<tr>
							<td></td>
							<td><label className="login-error">{error}</label></td>
						</tr> : null
						}
					</tbody>
				</table>
			</form>
		</Container>
	)
}

export default Login;
