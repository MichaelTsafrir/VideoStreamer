import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomePage } from '../pages/homePage';
import { LoginPage } from '../pages/loginPage';
import { RegisterPage } from '../pages/registerPage';
import { LibraryPage } from '../pages/libraryPage';
import logo from '../../images/logo.png';
import './app.css';

const App: React.FC = () => {
	return (
		<div className="App">
			<img src={logo} className="App-logo" alt="logo" />
			<div className="Container">
				<div className="Main">
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
			</div>
		</div>
	);
};

export default App;
