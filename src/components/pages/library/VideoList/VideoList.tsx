import React, { useState } from 'react';

const VideoList = () => {
	const [videos, setVideos] = useState([
		{ name: "first", description: "1 Video", url: "www.youtube.com",	byUser: "God", addDate: Date.now() },
		{ name: "second", description: "2 Video", url: "www.youtube.com",	byUser: "God", addDate: Date.now() },
		{ name: "third", description: "3 Video", url: "www.youtube.com",	byUser: "God", addDate: Date.now() },
	]);

	return (
		<div className="video-list">
			<ul>
				{videos.map(video => <li key={video.name}>{video.name}</li>)}
			</ul>
		</div>
	);
}

export default VideoList;
