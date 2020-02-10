import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setVideos } from 'actions/videos';
import { videosSelector, userSelector } from 'selectors';
import Video from '../Video/Video';

import './VideoList.scss';
import { serverAddress } from 'common/common';

const VideoList = () => {
	const dispatch = useDispatch();
	const user = useSelector(userSelector);
	const videos = useSelector(videosSelector);

	useEffect(() => {
		if (user) {
			axios.get(`${serverAddress}/videos/${user.id}`, { withCredentials: true })
			.then((res) => {
				const {status, error, videos} = res.data;

				if (status === "ok") {
					dispatch(setVideos(videos));
				}
				else {
					console.log("Couldn't fetch videos", error);
				}
			})
			.catch(error => {
				// Couldn't fetch Videos, log event
				console.log(error);
			});
		}
	}, [dispatch, user]);

	return (
		<div className="video-list">
			{ videos && videos.map(video => <Video key={video.id} video={video} />) }
		</div>
	);
}

export default VideoList;
