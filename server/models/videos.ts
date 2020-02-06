import mongoose from 'mongoose';
import { videoDocument } from '../types';

const Schema = mongoose.Schema;

export const videoSchemaData = {
	name: String,
	description: String,
	url: String,
	byUser: String,
	addDate: Date,
};

export const VIDEO_MODEL = 'video';

// Create schema
export const videoSchema = new Schema(videoSchemaData);

// Create model
export const videoModel = mongoose.model<videoDocument>(VIDEO_MODEL, videoSchema);
