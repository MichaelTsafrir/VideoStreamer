import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const videoSchemaData = {
	name: String,
	description: String,
	url: String,
	byUser: mongoose.Types.ObjectId,
	addDate: Date,
};

export const VIDEO_MODEL = 'video';

// Create schema
export const videoSchema = new Schema(videoSchemaData);

// Create model
export const videoModel = mongoose.model(VIDEO_MODEL, videoSchema);
