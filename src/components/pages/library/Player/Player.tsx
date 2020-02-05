import React, { useRef, useEffect } from 'react';
import './Player.scss';
const jsmpeg = require('jsmpeg');


interface Props {}

const Player: React.FC<Props> = () => {
	const videoCanvasId = 'videoCanvas';
	const playerRef = useRef(null);

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