import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import './App.css';

const AppStyle = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
	display: flex;
	position: relative;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: 50% 50%;
`;

const Content = styled.div`
	margin: 0 auto;
	padding-top: 10px;
	width: 1100px;
`;

const AppLayout = ({ children }) => {
	const [ bgImage, setBgImage ] = useState(null);

	/*useEffect(() => {
		fetch('https://source.unsplash.com/random/1024x768', { mode: 'cors' })
			.then(res => setBgImage(res.url));
	}, []);*/

	return (
		<AppStyle style={ { backgroundImage: `url(${bgImage})` } }>
			<Content>
				{children}
			</Content>
		</AppStyle>
	)
}

export default AppLayout;