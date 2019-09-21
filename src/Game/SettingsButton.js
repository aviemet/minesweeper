import React from 'react';
import { useSettingsMenu } from '../context/SettingsMenuContext';
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
	const settingsMenu = useSettingsMenu();
	
	const toggleSettingsMenu = () => {
		settingsMenu.toggleVisible();
	};

	return (
		<SettingsButtonContainer>
			<Icon icon='cogs' size='lg' onClick={ toggleSettingsMenu }/>
		</SettingsButtonContainer>
	);
};

export default SettingsButton;