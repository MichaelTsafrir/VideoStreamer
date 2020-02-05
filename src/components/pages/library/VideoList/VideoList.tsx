import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setVideos } from '../../../../actions/videos';
import { videosSelector } from '../../../../selectors';


const VideoList = () => {
	const dispatch = useDispatch();
	const videos = useSelector(videosSelector);

	useEffect(() => {
		axios.get('http://localhost:3001/videos/bob')
		.then((res) => {
			const {status, error, videos} = res.data;
			dispatch(setVideos(videos));
		})
		.catch(error => {
			// Couldn't fetch Videos
			console.log(error);
		});
	});

	return (
		<div className="video-list">
			<ul>
				{ videos && videos.map(video => <li key={video.name}>{video.name}</li>)}
			</ul>
		</div>
	);
}

export default VideoList;
