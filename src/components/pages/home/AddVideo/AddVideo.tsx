import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from 'selectors';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import Container from 'components/Container/Container';
import AddVideoButton from "../../../../images/Add-video.png"
import ClearButton from "../../../../images/clear-button.png"
import './AddVideo.scss';

interface Props {};

const AddVideo: React.FC<Props> = () => {
	const user = useSelector(userSelector);
	const history = useHistory();

	const [name, setName] = useState('');
	const [url, setUrl] = useState('');
	const [description, setDescription] = useState('');
	const [error, setError] = useState();
	const [nameError, setNameError] = useState(false);
	const [urlError, setUrlError] = useState(false);
	const [descriptionError, setDescriptionError] = useState(false);
	
	const setMissingFields = async () => setError('Please Fill All Fields!');

	const clearError = () => {
		setNameError(false);
		setUrlError(false);
		setDescriptionError(false);
		setError('');
	};

	const handleClear = (e: React.MouseEvent) => {
		e.preventDefault();

		setName('');
		setUrl('');
		setDescription('');
		clearError();
	};

	const checkUrl = () => url.startsWith('rtsp://');

	const handleAdd = async (e: React.MouseEvent) => {
		e.preventDefault();
		
		const isUrlValid = checkUrl();

		// Clear previos errors if exist
		clearError();

		if (!isUrlValid) {
			setError('URL not as a rtsp format');
			setUrlError(true);
		}

		if (!name) {
			setMissingFields();
			setNameError(true);
		}

		if (!url) {
			setMissingFields();
			setUrlError(true);
		}

		if (!description) {
			setMissingFields();
			setDescriptionError(true);
		}

		// Sidenote: setState is asynchronous so we can't rely on error param when checking for errors
		if (name && url && description && isUrlValid && user) {
			try {
				const res = await axios.post('http://localhost:3001/addVideo', {
					name,
					description,
					url,
					byUser: user.id,
				}, { withCredentials: true });

				const { error, status } = res.data;

				if (status === "ok") {
					// Redirect user to library page
					history.push('/library');
				}
				else {
					// Server returned error
					setError(error);
				}
			}
			catch (err) {
				// Request failed, log event
				console.log(err);
				setError('Client couldn\'t connect to server');
			}
		}
	};

	return (
		<Container>
			<h3>Add new Video</h3>
			<table className="add-fields-container">
				<tbody>
					<tr>
						<td className={nameError ? "error" : ""}>Name:</td>
						<td><input type="text" value={name} onChange={(e) => setName(e.target.value)} /></td>
					</tr>
					<tr>
						<td className={urlError ? "error" : ""}>URL:</td>
						<td><input type="text" value={url} onChange={(e) => setUrl(e.target.value)} /></td>
					</tr>
					<tr>
						<td className={descriptionError ? "error" : ""}>Description:</td>
						<td><input type="text" value={description} onChange={(e) => setDescription(e.target.value)} /></td>
					</tr>
					<tr>
						<td colSpan={2} className={error ? "button-fields noPadding" : "button-fields"}>
							<img onClick={handleClear} src={ClearButton} alt="Clear Fields" title="Clear Fields" />
							<img onClick={handleAdd} src={AddVideoButton} alt="Add Video" title="Add Video" />
						</td>
					</tr>
					{ error ?
					<tr>
						<td colSpan={2} className="add-error-wrapper"><label>{error}</label></td>
					</tr> : null 
					}
				</tbody>
			</table>
		</Container>
	);
};

export default AddVideo;
