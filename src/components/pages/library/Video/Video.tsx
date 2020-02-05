import React from 'react';
import dayjs from 'dayjs';
import { Video as VideoType } from "../../../../../common/types";
import videoPlaceholder from "../../../../images/video-placeholder.png";

import './Video.scss';

interface Props {
	video: VideoType,
}

const Video: React.FC<Props> = (props) => {
	const { video } = props;

	return(
		<div className="video-placeholder">
			<table>
				<tbody>
					<tr>
						<td rowSpan={3}><img src={videoPlaceholder} alt={video.name} /></td>
						<td><label>{video.name}</label></td>
					</tr>
					<tr>
						<td><label>{video.description}</label></td>
					</tr>
					<tr>
						<td><label>{dayjs(video.addDate).format('DD/MM/YY HH:mm')}</label></td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default Video;
