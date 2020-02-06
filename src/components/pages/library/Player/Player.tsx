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
			axios.post('http://localhost:3001/startVideo', { videoID: videoID })
			.then(res => {
				console.log("sent request to /startVideo", res);
				const { error, status } = res.data;

				if (status !== "ok") {
					// log error
					console.log("Failed to start stream on server", error);
				}
				else {
					console.log("create canvas", videoID);
					const canvas = document.getElementById(videoCanvasId);
					const client = new WebSocket('ws://localhost:3002');
					new jsmpeg(client, {	
						canvas,
					});
				}
			}).catch(error => {
				// log error
				console.log("Failed to start stream on server", error);
			});
		}
	}, [videoID]);
	
	return (
		<div className="jsmpeg" data-url="ws://localhost:3002">
			<canvas ref={playerRef} id={videoCanvasId}></canvas>
		</div>
	);
};

export default Player;