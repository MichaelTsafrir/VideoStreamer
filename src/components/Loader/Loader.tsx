import React from 'react';
import Loading from '../../images/loader.gif';
import Container from 'components/Container/Container';
import './Loader.scss';

interface Props {};

const Loader: React.FC<Props> = () => {
	return (
		<Container>
			<img src={Loading} className="loader" alt="Loading Page" />
		</Container>
	);
}

export default Loader;
