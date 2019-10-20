import React from 'react';
import { useApp } from '../context/AppContext';

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const SettingsButtonContainer = styled.div`
	float: right;
	color: white;
	display: inline-block;
	text-align: right;
	height: ${ ({ theme }) => theme.difficulty.height - (theme.difficulty.padding * 2) }px;
	cursor: pointer;
	transition: color 0.25s ease-in-out;

	&:hover {
		color: #CCC;
	}

	& > svg {
		top: 50%;
		position: relative;
		transform: translateY(-50%);
	}
`;

const SettingsButton = () => {
	const app = useApp();
	
	const toggleSettingsMenu = () => app.toggleSettingsMenu();

	return (
		<SettingsButtonContainer>
			<Icon icon='cogs' size='lg' onClick={ toggleSettingsMenu }/>
		</SettingsButtonContainer>
	);
};

export default SettingsButton;