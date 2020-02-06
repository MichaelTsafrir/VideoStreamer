import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import './Register.scss';
import Container from '../../../Container/Container';
import { setUser } from '../../../../actions/user';

interface Props {}

const Register: React.FC<Props> = () => {
	const dispatch = useDispatch();

	const [username, setUsername] = useState('');
	const [usernameError, setUsernameError] = useState(false);
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState(false);
	const [passwordConf, setPasswordConf] = useState('');
	const [passwordConfError, setPasswordConfError] = useState(false);
	const [firstname, setFirstname] = useState('');
	const [firstnameError, setFirstnameError] = useState(false);
	const [lastname, setLastname] = useState('');
	const [lastnameError, setLastnameError] = useState(false);
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState(false);
	const [error, setError] = useState('');
	const [isRegistered, setIsRegistered] = useState(false);

	const setMissingFields = () => setError('Please Fill All Fields!');

	const clearError = () => {
		setUsernameError(false);
		setPasswordError(false);
		setPasswordConfError(false);
		setFirstnameError(false);
		setLastnameError(false);
		setEmailError(false);
		setError('');
	};

	const handleClear = () => {
		clearError();

		setUsername('');
		setPassword('');		
		setPasswordConf('');
		setFirstname('');		
		setLastname('');
		setEmail('');
		setIsRegistered(false);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		clearError();

		if (!username) {
			setMissingFields();
			setUsernameError(true);
		}

		if (!password) {
			setMissingFields();
			setPasswordError(true);
		}

		if (!passwordConf) {
			setMissingFields();
			setPasswordConfError(true);
		}

		if (!firstname) {
			setMissingFields();
			setFirstnameError(true);
		}

		if (!lastname) {
			setMissingFields();
			setLastnameError(true);
		}

		if (!email) {
			setMissingFields();
			setEmailError(true);
		}

		if (password !== passwordConf) {
			setError('Passwords Don\'t Match!')
			setPasswordError(true);
			setPasswordConfError(true);
		}

		if (!error) {
			try {
				const res = await axios.post('http://localhost:3001/register', {
					username,
					password,
					firstname,
					lastname,
					email,
				});

				const { error, status, user } = res.data;

				if (status === "ok") {
					setIsRegistered(true);
					
					setTimeout(() => {
						handleClear();
						dispatch(setUser(user));
					}, 2000);
				}
				else {
					setError(error);
				}
			}
			catch (err) {
				console.log(err);
				setError('Client couldn\'t connect to server');
			}
		}
	};

	return (
		<Container>
			<form onSubmit={handleSubmit}>
				<table className="register-fields">
					<tbody>
						<tr>
							<td className={usernameError ? "error" : ""}>Username:</td>
							<td><input type="text" value={username} onChange={e => setUsername(e.target.value)} /></td>
						</tr>
						<tr>
							<td className={passwordError ? "error" : ""}>Password:</td>
							<td><input type="password" value={password} onChange={e => setPassword(e.target.value)} /></td>
						</tr>
						<tr>
							<td className={passwordConfError ? "error" : ""}>Confirm:</td>
							<td><input type="password" value={passwordConf} onChange={e => setPasswordConf(e.target.value)} /></td>
						</tr>
						<tr>
							<td className={firstnameError ? "error" : ""}>Firstname:</td>
							<td><input type="text" value={firstname} onChange={e => setFirstname(e.target.value)} /></td>
						</tr>
						<tr>
							<td className={lastnameError ? "error" : ""}>Lastname:</td>
							<td><input type="text" value={lastname} onChange={e => setLastname(e.target.value)} /></td>
						</tr>
						<tr>
							<td className={emailError ? "error" : ""}>Email:</td>
							<td><input type="text" value={email} onChange={e => setEmail(e.target.value)} /></td>
						</tr>
						<tr>
							<td></td>
							<td className="input-row">
								<input type="submit" value="Register" />
								<input className="clear-button" type="button" value="Clear" onClick={handleClear} />
							</td>
						</tr>
						{ error ?
						<tr>
							<td></td>
							<td><label className="register-error">{error}</label></td>
						</tr> : null
						}
					</tbody>
				</table>
					{ isRegistered && <label className="register-complete">Registered!</label> }
			</form>
		</Container>
	);
};

export default Register;
