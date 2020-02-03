import React from 'react';
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

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	rootReducers,
	composeEnhancer(),
);

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<div className="App">
				<img src={logo} className="App-logo" alt="logo" />
				<div className="Container">
					<div className="Main">
						<h2 className="App-header">Video Streamer</h2>
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
