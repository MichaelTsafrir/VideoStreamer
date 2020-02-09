import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import { HomePage } from '../pages/home/homePage';
import { LoginPage } from '../pages/login/loginPage';
import { RegisterPage } from '../pages/register/registerPage';
import { LibraryPage } from '../pages/library/libraryPage';
import rootReducers from '../../reducers';
import logo from '../../images/logo.png';
import './app.scss';
import Axios from 'axios';
import { setUser } from 'actions/user';
import Loader from 'components/Loader/Loader';

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	rootReducers,
	composeEnhancer(),
);


const App: React.FC = () => {
	const [init, setInit] = useState(false);

	useEffect(() => {
		Axios.get('http://localhost:3001/loginSession', { withCredentials: true })
		.then(res => {
			const { status, user } = res.data;

			if (status === "ok") {
				// User was logged in
				store.dispatch(setUser(user));
			}

			setInit(true);
 		})
		.catch(error => {
			// error occured, log event
			console.log("Error on checking login session from server", error);
		});
	}, []);

	return (
		<Provider store={store}>
			<div className="app">
				<img src={logo} className="app-logo" alt="logo" />
				<div className="container">
					<div className="main">
						<h2 className="app-header">Video Streamer</h2>
					{ 
						init ?
						<BrowserRouter>
							<Switch>
								<Route path='/' exact component={HomePage} />
								<Route path='/login' exact component={LoginPage} />
								<Route path='/register' exact component={RegisterPage} />
								<Route path='/library/:videoID?' exact component={LibraryPage} />
								<Route path='/' render={() => <h3>Oops! Could't Find Page (404)!</h3>} />
							</Switch>
						</BrowserRouter> :
						<Loader />
					}
					</div>
				</div>
			</div>
		</Provider>
	);
};

export default App;
