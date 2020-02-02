import express from 'express';
import mongoose from 'mongoose';
import { User, Video } from '../common/types/schema';

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

var testUser = new userModel({
	username:"admin",
	password:"123",
	firstname:"Bob",
	lastname:"Vision",
	email:"admin@gmail.com",
});

var testVideo = new videoModel({
	name: "test",
	description: "bla",
	url: "www.youtube.com",
	addDate: Date.now()
});

testUser.save().then(() => console.log('ADDED TEST USER'));
testVideo.save().then(() => console.log('ADDED TEST VIDEO'));

app.get('/user/:id', (req, res) => {
	const userID = req.params.id;

	userModel.find((err, user) => {
		return res.send(user);
	});
});

app.get('/video/:id', (req, res) => {
	const videoID = req.params.id;

	videoModel.find((err, video) => {
		return res.send(video);
	});
});

app.listen(port, () => {
	console.log(`Server is listening on ${port}`);
});