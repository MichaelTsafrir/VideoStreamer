import React, { useRef, useEffect } from 'react';
const jsmpeg = require('jsmpeg');

interface Props {}

// 	 <source src="rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov" type="application/x-rtsp" />
// 	  <source src="rtsp://184.72.239.149/vod/mp4:BigBuckBunny_175k.mov" type="application/x-rtsp" /> 

const Video: React.FC<Props> = () => {
	const videoRef = useRef(null);

	useEffect(() => {
		const canvas = document.getElementById('videoCanvas');
		const client = new WebSocket('ws://localhost:3002');
		const player = new jsmpeg(client, {	
			canvas,
		});
	});
	
	return (
		<div className="jsmpeg" data-url="ws://localhost:3002">
			<canvas ref={videoRef} id="videoCanvas"></canvas>
		</div>
	);
};

export default Video;