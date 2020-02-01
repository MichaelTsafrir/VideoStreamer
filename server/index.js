const express = require('express');
const mongoose = require('mongoose');

const User = require('./models/users.js');
const Video = require('./models/videos.js');

console.log(User);

const port = process.env.PORT || 3001;

const app = express();

mongoose.connect('mongodb://localhost/videostreamer', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log("Connected to mongo");
});



var kittySchema = new mongoose.Schema({
	name: String
});
kittySchema.methods.speak = function () {
	var greeting = this.name
	  ? "Meow name is " + this.name
	  : "I don't have a name";
	console.log(greeting);
};
var Kitten = mongoose.model('Kitten', kittySchema);
var silence = new Kitten({ name: 'Silence' });
var fluffy = new Kitten({ name: 'fluffy' });
fluffy.speak(); // "Meow name is fluffy"
fluffy.save().then(() => console.log('meow'));
console.log(silence.name); // 'Silence'

var testUser = new User({
	username:"admin",
	password:"123",
	firstname:"Bob",
	lastname:"Vision",
	email:"admin@gmail.com",
});

var testVideo = new Video({
	name: "test",
	description: "bla",
	url: "www.youtube.com",
	byUser: "Bob",
	addDate: Date.now()
});

testUser.save().then(() => console.log('ADDED TEST USER'));
testVideo.save().then(() => console.log('ADDED TEST VIDEO'));

app.get('/user/:id', (req, res) => {
	const userID = req.params.id;

	User.find((err, user) => {
		res.send(user);
	});
});

app.get('/video/:id', (req, res) => {
	const videoID = req.params.id;

	Video.find((err, video) => {
		res.send(video);
	});
});

app.listen(port, () => {
	console.log(`Server is listening on ${port}`);
});