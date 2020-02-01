const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchemaData = {
	name: String,
	description: String,
	url: String,
	byUser: Schema.ObjectId,
	addDate: Date,
};

const VIDEO_MODEL = 'video';

// Create schema
const videoSchema = Schema(videoSchemaData);

// Create model
const Video = mongoose.model(VIDEO_MODEL, videoSchema);

module.exports = {
	VIDEO_MODEL: VIDEO_MODEL,
	videoSchemaData: videoSchemaData,
	Video: Video,
};
