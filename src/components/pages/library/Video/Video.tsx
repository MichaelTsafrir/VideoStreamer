import React from 'react';

interface Props {}

const Video: React.FC<Props> = () => {
	return ( // autoplay prop
		<video id="test_video" controls> 
			 <source src="rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov" type="application/x-rtsp" />
			 {/* <source src="rtsp://184.72.239.149/vod/mp4:BigBuckBunny_175k.mov" type="application/x-rtsp" /> */}
		</video>
	);
};

export default Video;