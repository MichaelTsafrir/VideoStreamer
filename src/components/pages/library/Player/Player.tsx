import React, { useRef, useEffect } from 'react';
import axios from 'axios';
import './Player.scss';
const jsmpeg = require('jsmpeg');


interface Props {
	videoID: string,
}

const Player: React.FC<Props> = (props) => {
	const videoCanvasId = 'videoCanvas';
	const playerRef = useRef(null);
	const { videoID } = props;
	
	useEffect(() => {
		if (videoID) {	
			let client: WebSocket;

			// Create a cancel token for a rest call
			const reqCancelToken = axios.CancelToken.source();

			// Close function for the player
			const closeFunction = () => client && client.close();

			axios.post(
				'http://localhost:3001/startVideo',
				{ videoID: videoID },
				{ cancelToken: reqCancelToken.token, withCredentials: true }
			)
			.then(res => {
				const { error, status } = res.data;

				if (status !== "ok") {
					// log error
					console.log("Failed to start stream on server", error);
				}
				else {
					// Create a new web socket and a canvas for the video
					client = new WebSocket('ws://localhost:3002');
					const canvas = document.getElementById(videoCanvasId);
					new jsmpeg(client, {	
						canvas,
					});
				}
			}).catch(error => {
				// log error
				console.log("Failed to start stream on server", error);
			});

			// Will be called upon component unmount
			return closeFunction;
		}
	}, [videoID]);
	
	return (
		<div className="jsmpeg" data-url="ws://localhost:3002">
			<canvas ref={playerRef} id={videoCanvasId}></canvas>
		</div>
	);
};

export default Player;