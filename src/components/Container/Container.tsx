import React from 'react';
import './Container.scss';

interface Props {}

const Container: React.FC<Props> = (props) => {
	return (
		<div className="login-container">
			{props.children}
		</div>
	);
};

export default Container;
