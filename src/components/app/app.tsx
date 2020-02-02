import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomePage } from '../pages/homePage';
import { LoginPage } from '../pages/loginPage';
import { RegisterPage } from '../pages/registerPage';
import { LibraryPage } from '../pages/libraryPage';
import logo from '../../images/logo.svg';
import './app.css';

const App: React.FC = () => {
	return (
		<div className="App">
			<BrowserRouter>
				<Switch>
					<Route path='/' exact component={HomePage} />
					<Route path='/login' exact component={LoginPage} />
					<Route path='/register' exact component={RegisterPage} />
					<Route path='/library/:videoID' exact component={LibraryPage} />
					<Route path='/' render={() => <div>404</div>} />
				</Switch>
			</BrowserRouter>
		</div>
	);
};

export default App;
