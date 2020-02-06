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
	
	useEffect(() => {
		if (props.videoID) {
			axios.post('http://localhost:3001/startVideo', { videoID: props.videoID })
			.then(res => {
				const { error, status } = res.data;

				if (status !== "ok") {
					// log error
					console.log("Failed to start stream on server", error);
				}
			}).catch(error => {
				// log error
				console.log("Failed to start stream on server", error);
			});
		}
	});

	useEffect(() => {
		const canvas = document.getElementById(videoCanvasId);
		const client = new WebSocket('ws://localhost:3002');
		new jsmpeg(client, {	
			canvas,
		});
	});
	
	return (
		<div className="jsmpeg" data-url="ws://localhost:3002">
			<canvas ref={playerRef} id={videoCanvasId}></canvas>
		</div>
	);
};

export default Player;