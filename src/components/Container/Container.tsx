import React from 'react';
import './Container.scss';

interface Props {}

const Container: React.FC<Props> = (props) => {
	return (
		<div className="wrapper">
			{props.children}
		</div>
	);
};

export default Container;
