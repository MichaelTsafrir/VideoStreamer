import React, { useState } from 'react';
import './Register.scss';
import Container from '../../../Container/Container';

interface Props {}

const Register: React.FC<Props> = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConf, setPasswordConf] = useState('');
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [email, setEmail] = useState('');

	const handleSubmit = () => {};
	const handleClear = () => {
		setUsername('');
		setPassword('');
		setPasswordConf('');
		setFirstname('');
		setLastname('');
		setEmail('');
	};

	return (
		<Container>
			<form onSubmit={handleSubmit}>
				<table className="register-fields">
					<tbody>
						<tr>
							<td>Username:</td>
							<td><input type="text" value={username} onChange={e => setUsername(e.target.value)} /></td>
						</tr>
						<tr>
							<td>Password:</td>
							<td><input type="password" value={password} onChange={e => setPassword(e.target.value)} /></td>
						</tr>
						<tr>
							<td>Confirm:</td>
							<td><input type="password" value={passwordConf} onChange={e => setPasswordConf(e.target.value)} /></td>
						</tr>
						<tr>
							<td>Firstname:</td>
							<td><input type="text" value={firstname} onChange={e => setFirstname(e.target.value)} /></td>
						</tr>
						<tr>
							<td>Lastname:</td>
							<td><input type="text" value={lastname} onChange={e => setLastname(e.target.value)} /></td>
						</tr>
						<tr>
							<td>Email:</td>
							<td><input type="text" value={email} onChange={e => setEmail(e.target.value)} /></td>
						</tr>
						<tr>
							<td></td>
							<td className="input-row">
								<input type="submit" value="Register" />
								<input className="clear-button" type="button" value="Clear" onClick={handleClear} />
							</td>
						</tr>
					</tbody>
				</table>
			</form>
		</Container>
	);
};

export default Register;
