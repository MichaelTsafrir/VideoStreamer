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

			const reqCancelToken = axios.CancelToken.source();

			const closeFunction = () => client && client.close();

			axios.post('http://localhost:3001/startVideo', { videoID: videoID }, { cancelToken: reqCancelToken.token })
			.then(res => {
				const { error, status } = res.data;

				if (status !== "ok") {
					// log error
					console.log("Failed to start stream on server", error);
				}
				else {
					console.log("CLIENT CONNECTED");
					const canvas = document.getElementById(videoCanvasId);
					client = new WebSocket('ws://localhost:3002');
					new jsmpeg(client, {	
						canvas,
					});
				}
			}).catch(error => {
				// log error
				console.log("Failed to start stream on server", error);
			});

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