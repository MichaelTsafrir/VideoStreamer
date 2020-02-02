import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import { userModel }  from './models/users';
import { videoModel } from './models/videos';

const port = process.env.PORT || 3001;

const app = express();

mongoose.connect('mongodb://localhost/videostreamer', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log("Connected to mongo");
});


// Use bodyParser Middleware to fetch body params
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/auth', (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		res.send({ status: 'error', error: 'missing params from request' });
	}
	else {
		userModel.find({ username, password })
			.then(user => {
				user ? res.send({ status: 'ok', user}) : res.send({ status: 'error', error: 'Wrong username or password'});
			})
			.catch((error) => res.send({ status: 'error', error }));
	}
});

app.post('/logOut', (req, res) => {
	
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