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

	input[type=radio], input[type=checkbox] {
		appearance: none;
		display: inline-block;
		position: relative;
		background-color: #f1f1f1;
		color: #666;
		top: 5px;
		height: ${ ({ theme }) => theme.checkWidth }px;
		width: ${ ({ theme }) => theme.checkWidth }px;
		border: 0;
		border-radius: 50%;
		cursor: pointer;     
		margin-right: 7px;
		outline: none;
		transition: background ${ ({ theme }) => theme.settings.transitionTime }s ease-in-out;
	}

	input[type=radio]:checked::before, input[type=checkbox]:checked::before {
		position: absolute;
		display: block;
		width: calc(${ ({ theme }) => theme.checkWidth }px - 4px);
		height: calc(${ ({ theme }) => theme.checkWidth }px - 4px);
		left: 2px;
		top: 2px;
		background: ${ ({ theme }) => theme.colors.mint };
		content: ' ';
		border-radius: 50%;
	}

	input[type=radio]:hover, input[type=checkbox]:hover {
		background-color: #999999;
	}

	input[type=radio]:checked, input[type=checkbox]:checked {
		background-color: #f1f1f1;
	}

	label {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		cursor: pointer;
	}
`;

const Content = styled.div`
	margin: 0 auto;
	padding-top: 10px;
	width: 1100px;
`;

const AppLayout = ({ children }) => {
	const [ bgImage, setBgImage ] = useState(null);

	const useRandomBg = JSON.parse(localStorage.getItem('bgenabled'));

	useEffect(() => {
		if(useRandomBg !== false) {
			fetch('https://source.unsplash.com/random/1024x768', { mode: 'cors' })
				.then(res => setBgImage(res.url));
		}
	}, []);

	return (
		<AppStyle style={ { backgroundImage: `url(${bgImage})` } }>
			<Content>
				{children}
			</Content>
		</AppStyle>
	)
}

export default AppLayout;