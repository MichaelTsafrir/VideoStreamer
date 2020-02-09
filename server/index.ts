import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';
import { User, Video } from '../common/types';
import { webSocketPort } from '../common/common';

import { userModel }  from './models/users';
import { videoModel } from './models/videos';

const Stream = require('node-rtsp-stream');

// rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov
// Outer library, has no TS definition
// let stream: any;
const stream = new Stream({
	name: "test",
	streamUrl: "rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov",
	wsPort: webSocketPort,
	ffmpegOptions: {
		'-vb': "50m",
		'-stats': '',
		'-r': 30,
		'-tune': "film",
		"-preset": "medium",
	},
});

const port = process.env.PORT || 3001;

const app = express();

// Create mongo connection
mongoose.connect('mongodb://localhost/videostreamer', { useNewUrlParser: true, useUnifiedTopology: true });

// Connect the session to be stored on mongo
const MongoStore = connectMongo(session);

const db = mongoose.connection;

// Setup db logs
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log("Connected to mongo");
});


// Allow Cross-Origin
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Use bodyParser Middleware to fetch body params
app.use(bodyParser.json());

// Use session middleware with mongo
app.use(session({
	secret: 'SuperSecret',
	saveUninitialized: false,
	resave: false,
	store: new MongoStore({
		mongooseConnection: db,
		ttl: 60 * 60 * 5, // set expiration for 5 hours
	}),
}));

app.post('/auth', async (req, res) => {
	const { username, password } = req.body;

	// Check whether parameters were attached to request
	if (!username || !password) {
		res.send({ status: 'error', error: 'missing params from request' });
	}
	else {
		try {
			// Fetch user
			const data = await userModel.find({ username, password }).limit(1);
			
			// Check if user was found
			if (!data || !data.length) {
				res.send({ status: 'error', error: 'Wrong username or password'});
			}
			else {
				const {
					id,
					username,
					firstname,
					lastname,
					email,
				} = data[0];

				// Create a User object from the server data
				const user: User = {
					id,
					username,
					firstname,
					lastname,
					email,
				};

				// Save login session
				if (req.session) {
					req.session.user = user;
					req.session.test = true;

					res.send({ status: 'ok', user: req.session.user});
				}
				else {
					console.error('Session is not set')
					res.send({ status: 'error', error: 'could not create session'});
				}
			}
		}
		catch(error) {
			res.send({ status: 'error', error });
		};
	}
});

app.get('/loginSession', (req, res) => {
	if (req.session && req.session.user) {
		res.send({ status: 'ok', user: req.session.user });
	}
	else {
		res.send({ status: 'error', error: 'no session found' });
	}
});

app.post('/logOut', (req, res) => {
	if (req.session && req.session.user) {
		// Delete login session
		delete req.session.user;

		res.send({ status: 'ok' });
	}
	else {
		res.send({ status: 'error', error: 'trying to log out when no user is logged in' });
	}
});

app.get('/videos/:userID', async (req, res) => {
	// Check if user is logged in
	if (req.session && req.session.user) {
		const { userID } = req.params;

		// Check whether userID was attached to request
		if (!userID) {
			res.send({ status: 'error', error: "userID as param is required"});
		}
		else {
			try {
				// Fetch all videos for requested user
				const data = await videoModel.find({ byUser: userID });

				// Create a Video object from server's data
				const videos: Video[] = data.map(({id, name, description, url, byUser, addDate}) => ({
					id,
					name,
					description,
					url,
					byUser,
					addDate,
				}));

				res.send({ status: 'ok', videos });
			}
			catch(error) {
				// Log error
				console.log(error);

				res.send({ status: 'error', error: 'server failed fetching videos' });
			}
		}
	}
	else {
		res.send({ status: 'error', error: "Unauthorized: User not signed in" });
	}
});

// // Check if stream already exists
// if (stream) {
// 	// Kill running stream
// 	stream.stop();
// }

// let stream: any;
// stream = new Stream({
// 	name: "test",
// 	streamUrl: "rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov",
// 	wsPort: webSocketPort,
// 	ffmpegOptions: {
// 		'-vb': "50m",
// 		'-stats': '',
// 		'-r': 30,
// 		'-tune': "film",
// 		"-preset": "medium",
// 	},
// });

app.post('/startVideo', async (req, res) => {
	// Check if user is logged in
	if (req.session && req.session.user) {
		const { videoID } = req.body;

		// Check if Video ID was attached in the request
		if (!videoID) {
			res.send({ status:"error", error: "videoID as body param is required"});
		}
		else{
			try {
				// Fetch video by ID
				const data = await videoModel.find({ _id: videoID});
				
				// Check if video was found
				if (!data.length) {
					res.send({ status: 'error', error: `Couldn't find videoID ${videoID}` })
				}
				else{
					const video = data[0];

					// Check if stream already exists
					// if (stream) {
					// 	// Kill running stream
					// 	stream.stop();
					// }

					// Create a new stream through web socket
					// if (! stream)
					// 	stream = new Stream({
					// 		name: "test",
					// 		streamUrl: "rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov",
					// 		wsPort: webSocketPort,
					// 		ffmpegOptions: {
					// 			'-vb': "50m",
					// 			'-stats': '',
					// 			'-r': 30,
					// 			'-tune': "film",
					// 			"-preset": "medium",
					// 		},
					// 	});

					res.send({ status: 'ok' })
				}
			}
			catch(error) {
				res.send({ status: 'error', error });
			};
		}
	}
	else {
		res.send({ status: 'error', error: "Unauthorized: User not signed in" });
	}

});

app.post('/register', async (req, res) => {
	const { username, password, firstname, lastname, email } = req.body;

	// Check if all parameters were attached to request
	if ( username && password && firstname && lastname && email) {
		try {
			// Fetch user with requested username
			const data = await userModel.find({ username });
			
			// Check whether data was found
			if (!!data.length) {
				res.send({ status: 'error', error: 'username already exists' })
			}
			else {
				// Create new User document for mongo
				const newUser = new userModel({
					username,
					password,
					firstname,
					lastname,
					email,
				});
		
				try {
					// Save user in mongo
					await newUser.save();
					
					// Save to session
					if (req.session) {
						req.session.user = newUser;
					}
					else {
						console.error('Session is not set')
					}
		
					res.send({ status: 'ok', user: newUser })
				}
				catch(error) {
					// Log error
					console.log(error);

					res.send({ status: 'error', error: 'server failed registering user' });
				};
			}
		}
		catch(error) {
			// Log error
			console.log(error);

			res.send({ status: 'error', error: 'server failed registering user' });
		};	
	}
	else {
		res.send({ status: 'error', error: 'missing params from request' })
	}
});

app.post('/addVideo', async (req, res) => {
	// Check if user is logged in
	if (req.session && req.session.user) {
		const { name, description, url, byUser } = req.body;

		// Check if all parameters were attached to request
		if ( name && description && url && byUser) {
			// Create a new video document for mongo
			const newVideo = new videoModel({
				name,
				description,
				url,
				byUser,
				addDate: Date.now()
			});

			try {
				// Save document in mongo
				await newVideo.save()
				
				res.send({ status: 'ok' });
			}
			catch(error) {
				// Log error
				console.log(error);

				res.send({ status: 'error', error: 'server failed adding video' });
			};
		}
		else {
			res.send({ status: 'error', error: 'missing params from request' })
		}
	}
	else {
		res.send({ status: 'error', error: "Unauthorized: User not signed in" });
	}
});

app.listen(port, () => {
	console.log(`Server is listening on ${port}`);
});
