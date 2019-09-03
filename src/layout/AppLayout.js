import React from 'react';
import NavBar from './NavBar';

import styled from 'styled-components';
import './App.css';

const AppStyle = styled.div`
  width: 100%;
  height: 100%;
  background: #222;
  text-align: center;
  display: flex;
`;

const Content = styled.div`
	margin: ${({ theme }) => theme.navbar.height} auto 0 auto;
	padding-top: 10px;
	width: 1100px;
`;

const Footer = styled.div`
	background-image:url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="${({ theme }) => theme.icons.bomb.icon[0]}" height="${({ theme }) => theme.icons.bomb.icon[1]}" viewBox="0 0 ${({ theme }) => theme.icons.bomb.icon[0]} ${({ theme }) => theme.icons.bomb.icon[1]}"><path d="${({ theme }) => theme.icons.bomb.icon[4]}" ></path></svg>');
	background-size:contain;
`;

const AppLayout = ({ children }) => {
	return (
		<AppStyle>
			<NavBar />
			<Content>
				{children}
			</Content>
		</AppStyle>
	)
}

export default AppLayout;