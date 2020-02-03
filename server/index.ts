import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import mongoose from 'mongoose';
import path from 'path';

import { userModel }  from './models/users';
import { videoModel } from './models/videos';

const port = process.env.PORT || 3001;

const app = express();

// Create mongo connection
mongoose.connect('mongodb://localhost/videostreamer', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

// Setup db logs
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log("Connected to mongo");
});

// Use session middleware
app.use(session({
	secret: 'SuperSecret',
	saveUninitialized: false,
	resave: false,
}));

// Use bodyParser Middleware to fetch body params
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/auth', (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		res.send({ status: 'error', error: 'missing params from request' });
	}
	else {
		userModel.find({ username, password })
			.then(user => {
				if (!user) {
					res.send({ status: 'error', error: 'Wrong username or password'});
				}
				else {
					// Save login session
					if (req.session) {
						req.session.user = user;
					}
					else {
						console.error('Session is not set')
					}

					res.send({ status: 'ok', user})
				}
			})
			.catch((error) => res.send({ status: 'error', error }));
	}
});

app.post('/logOut', (req, res) => {
	if (req.session) {
		// Destroy login session
		req.session.destroy(error => {
			// send feedback whether it was destroyed
			error ? res.send({ status: 'error', error }) : res.send({ status: 'ok' });
		});
	}
	else {
		res.send({ status: 'ok' });
	}
});

app.get('/videos/:userID', (req, res) => {
	const { userID } = req.params;

	videoModel.find({ byUser: userID })
		.then(videos => res.send({ status: 'ok', videos }))
		.catch(error => res.send({ status: 'error', error }));
});

app.post('/addUser', (req, res) => {
	const { username, password, firstname, lastname, email } = req.body;

	if ( username && password && firstname && lastname && email) {
		const newtUser = new userModel({
			username,
			password,
			firstname,
			lastname,
			email,
		});

		newtUser.save().then(() => res.send({ status: 'ok' })).catch((error) => res.send({ status: 'error', error }));
	}
	else {
		res.send({ status: 'error', error: 'missing params from request' })
	}
});

app.post('/addVideo', (req, res) => {
	const { name, description, url, byUser } = req.body;

	if ( name && description && url && byUser) {
		const newVideo = new videoModel({
			name,
			description,
			url,
			byUser,
			addDate: Date.now()
		});

		newVideo.save().then(() => res.send({ status: 'ok' })).catch((error) => res.send({ status: 'error', error }));
	}
	else {
		res.send({ status: 'error', error: 'missing params from request' })
	}
});

app.listen(port, () => {
	console.log(`Server is listening on ${port}`);
});