import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
import mongoose from 'mongoose';
import path from 'path';
import { User, Video } from '../common/types';
import { webSocketPort } from '../common/common';

import { userModel }  from './models/users';
import { videoModel } from './models/videos';

const Stream = require('node-rtsp-stream');

// rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov
// Outer library, has no TS definition
let stream: any;
// stream = new Stream({
// 	name: "test",
// 	streamUrl: "rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov",
// 	wsPort: webSocketPort,
// 	// width: 600,
// 	// height: 400,
// 	ffmpegOptions: {
// 		'-vb': "50m",
// 		'-stats': '',
// 		'-r': 30,
// 		'-tune': "film",
// 		"-preset": "medium",
// 	},
// });

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

// Allow Cross-Origin
app.use(cors());

// Use bodyParser Middleware to fetch body params
app.use(bodyParser.json());

// Use session middleware
app.use(session({
	secret: 'SuperSecret',
	saveUninitialized: false,
	resave: false,
}));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/auth', (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		res.send({ status: 'error', error: 'missing params from request' });
	}
	else {
		userModel.find({ username, password }).limit(1)
			.then((data) => {
				if (!data || !data.length) {
					res.send({ status: 'error', error: 'Wrong username or password'});
				}
				else {
					const user: User = {
						id: data[0].id,
						username: data[0].username,
						firstname: data[0].firstname,
						lastname: data[0].lastname,
						email: data[0].email,
					};

					// Save login session
					if (req.session) {
						req.session.user = user;
						req.session.save((err) => {
							if (err) {
								// Couldn't save session, Log error
								console.error('Couldn\'t save session', err);
							}
							else
								console.log(req.session);
						});
					}
					else {
						console.error('Session is not set')
					}

					res.send({ status: 'ok', user: user});
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
		.then(data => {
			const videos: Video[] = data.map(({id, name, description, url, byUser, addDate}) => ({
				id,
				name,
				description,
				url,
				byUser,
				addDate,
			}));

			res.send({ status: 'ok', videos });
		})
		.catch(error => res.send({ status: 'error', error }));
});

app.post('/startVideo', (req, res) => {
	const { videoID } = req.body;

	if (!videoID) {
		res.send({ status:"error", error: "videoID as body param is required"});
	}
	else{
		videoModel.find({ _id: videoID})
			.then(data => {
				if (!data.length) {
					res.send({ status: 'error', error: `Couldn't find videoID ${videoID}` })
				}
				else{
					const video = data[0];

					if (stream) {
						// Kill running stream
						stream.stop();
					}
	
					stream = new Stream({
						name: video.name,
						streamUrl: video.url,
						wsPort: webSocketPort,
						ffmpegOptions: {
							'-vb': "50m",
							'-stats': '',
							'-r': 30,
							'-tune': "film",
							"-preset": "medium",
						},
					});
	
					res.send({ status: 'ok' })
				}
			})
			.catch(error => res.send({ status: 'error', error }));

		res.send({ status:"ok" });
	}

});

app.post('/register', (req, res) => {
	const { username, password, firstname, lastname, email } = req.body;

	if ( username && password && firstname && lastname && email) {
		const newUser = new userModel({
			username,
			password,
			firstname,
			lastname,
			email,
		});

		newUser.save()
		.then(() => {
			// Save to session
			if (req.session) {
				req.session.user = newUser;
			}
			else {
				console.error('Session is not set')
			}

			res.send({ status: 'ok', user: newUser })
		})
		.catch((error) => res.send({ status: 'error', error }));
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

		newVideo.save()
		.then(() => res.send({ status: 'ok' }))
		.catch((error) => {
			// Log error
			console.log(error);

			res.send({ status: 'error', error: 'server failed adding video' });
		});
	}
	else {
		res.send({ status: 'error', error: 'missing params from request' })
	}
});

app.listen(port, () => {
	console.log(`Server is listening on ${port}`);
});