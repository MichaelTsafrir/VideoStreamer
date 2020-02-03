import React, { useState } from 'react';
import axios from 'axios';
import './login.scss';

interface Props {}

const Login: React.FC<Props> = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('No Data');

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();

		if (!username) {
			console.log("EMPTY");
			return;
		}
	}
	return (
		<div className="login-container">
			<form onSubmit={handleSubmit}>
				Login
				<table className="login-fields">
					<tr>
						<td>Username</td>
						<td><input type="text" value={username} onChange={e => setUsername(e.target.value)} /></td>
					</tr>
					<tr>
						<td>Password</td>
						<td><input type="text" value={password} onChange={e => setPassword(e.target.value)} /></td>
					</tr>
					<tr>
						<td></td>
						<td><input type="submit" value="Login" /></td>
					</tr>
					{ error &&
					<tr>
						<td></td>
						<td><label className="login-error">{error}</label></td>
					</tr>
					}
				</table>
			</form>
		</div>
	)
}

export default Login;
