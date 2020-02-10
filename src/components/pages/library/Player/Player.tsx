import React, { useEffect } from 'react';
import axios from 'axios';
import './Player.scss';
import { serverAddress, webSocketURL } from 'common/common';

// Outer Library with no ts, declare as any to prevent ts errors
declare const JSMpeg: any;

interface Props {
	videoID: string,
}

const Player: React.FC<Props> = (props) => {
	// const playerRef = useRef(null);
	const { videoID } = props;
	
	useEffect(() => {
		if (videoID) {
			let player: any;

			// Create a cancel token for a rest call
			const reqCancelToken = axios.CancelToken.source();

			// Close function for the player
			const closeFunction = () => player && player.destroy();

			axios.post(
				`${serverAddress}/startVideo`,
				{ videoID: videoID },
				{ cancelToken: reqCancelToken.token, withCredentials: true }
			)
			.then(res => {
				const { error, status } = res.data;

				if (status === "ok") {
					// Create a new canvas for the video
					const canvas = document.createElement("canvas");
					canvas.id = "videoCanvas";

					// Attach canvas to the video container
					document.getElementById('player-container')?.appendChild(canvas);
					player = new JSMpeg.Player(webSocketURL, { canvas });
				}
				else {
					// log error
					console.log("Failed to start stream on server", error);
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
		<div className="jsmpeg" id="player-container">
		</div>
	);
};

export default Player;