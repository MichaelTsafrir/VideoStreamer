import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps<{ videoID: string }> {}

export const LibraryPage: React.FC<Props> = ({ match }) => {
	return <div>Library Page for {match.params.videoID}</div>
}
