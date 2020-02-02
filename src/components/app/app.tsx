import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomePage } from '../pages/home/homePage';
import { LoginPage } from '../pages/login/loginPage';
import { RegisterPage } from '../pages/register/registerPage';
import { LibraryPage } from '../pages/library/libraryPage';
import logo from '../../images/logo.png';
import './app.css';

const App: React.FC = () => {
	return (
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
							<Route path='/library/:videoID' exact component={LibraryPage} />
							<Route path='/' render={() => <h3>Oops! Wrong Route!</h3>} />
						</Switch>
					</BrowserRouter>
				</div>
			</div>
		</div>
	);
};

export default App;
