import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import './Register.scss';
import Container from 'components/Container/Container';
import { setUser } from 'actions/user';
import { serverAddress } from 'common/common';

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

	// Handle the registartion
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		clearError();

		let canRegister = true;

		if (!username) {
			setMissingFields();
			setUsernameError(true);
			canRegister = false;
		}

		if (!password) {
			setMissingFields();
			setPasswordError(true);
			canRegister = false;
		}

		if (!passwordConf) {
			setMissingFields();
			setPasswordConfError(true);
			canRegister = false;
		}

		if (!firstname) {
			setMissingFields();
			setFirstnameError(true);
			canRegister = false;
		}

		if (!lastname) {
			setMissingFields();
			setLastnameError(true);
			canRegister = false;
		}

		if (!email) {
			setMissingFields();
			setEmailError(true);
			canRegister = false;
		}

		if (password !== passwordConf) {
			setError('Passwords Don\'t Match!')
			setPasswordError(true);
			setPasswordConfError(true);
			canRegister = false;
		}

		if (canRegister) {
			try {
				// Request server to register user
				const res = await axios.post(
					`${serverAddress}/register`,
					{
						username,
						password,
						firstname,
						lastname,
						email,
					},
					{ withCredentials: true },
				);

				const { error, status, user } = res.data;

				if (status === "ok") {
					// Inform user of successful registartion
					setIsRegistered(true);
					
					// Set redux and trigger redirect
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
