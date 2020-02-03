import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../../actions/user';
import './login.scss';

interface Props {}

const Login: React.FC<Props> = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const dispatch = useDispatch();
	const history = useHistory();

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();

		if (!username || ! password) {
			return setError('Please enter username and password');
		}
		else {
			try {
				const res = await axios.post('http://localhost:3001/auth', { username, password });
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
					history.push('/');
				}
			}
			catch(err) {
				console.log(err);
				setError('Client couldn\'t connect to server');
			}
		}
	}
	return (
		<div className="login-container">
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
		</div>
	)
}

export default Login;
