import React, { useRef, useEffect } from 'react';
const jsmpeg = require('jsmpeg');

interface Props {}

const Video: React.FC<Props> = () => {
	const videoCanvasId = 'videoCanvas';
	const videoRef = useRef(null);

	useEffect(() => {
		const canvas = document.getElementById(videoCanvasId);
		const client = new WebSocket('ws://localhost:3002');
		new jsmpeg(client, {	
			canvas,
		});
	});
	
	return (
		<div className="jsmpeg" data-url="ws://localhost:3002">
			<canvas ref={videoRef} id={videoCanvasId}></canvas>
		</div>
	);
};

export default Video;