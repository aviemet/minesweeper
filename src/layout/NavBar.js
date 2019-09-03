import React from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';


const FullWidthBar = styled.div`
	width: 100%;
	height: ${({ theme }) => theme.navbar.height}
	background: #CCC;
	position: absolute;
	top: 0;

`;

const NavBar = () => {
	return (
		<FullWidthBar>
			<Icon icon="cogs" />
		</FullWidthBar>
	)
};

export default NavBar;