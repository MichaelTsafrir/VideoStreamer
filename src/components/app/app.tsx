import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, compose } from 'redux';
import { Provider, useSelector } from 'react-redux';
import { HomePage } from '../pages/home/homePage';
import { LoginPage } from '../pages/login/loginPage';
import { RegisterPage } from '../pages/register/registerPage';
import { LibraryPage } from '../pages/library/libraryPage';
import rootReducers from '../../reducers';
import logo from '../../images/logo.png';
import './app.scss';
import { userSelector } from 'selectors';
import Header from 'components/pages/home/Header/Header';

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
	// const user = useSelector(userSelector);

	return (
		<Provider store={store}>
			<div className="app">
				<img src={logo} className="app-logo" alt="logo" />
				<div className="container">
					{/* { user && <Header user={user} />} */}
					<div className="main">
						<h2 className="app-header">Video Streamer</h2>
						<BrowserRouter>
							<Switch>
								<Route path='/' exact component={HomePage} />
								<Route path='/login' exact component={LoginPage} />
								<Route path='/register' exact component={RegisterPage} />
								<Route path='/library/:videoID?' exact component={LibraryPage} />
								<Route path='/' render={() => <h3>Oops! Could't Find Page (404)!</h3>} />
							</Switch>
						</BrowserRouter>
					</div>
				</div>
			</div>
		</Provider>
	);
};

export default App;
