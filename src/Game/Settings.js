import React from 'react';
import { useGame } from '../context/GameStore';
import { useSettingsMenu } from '../context/SettingsMenuContext';
import { observer } from 'mobx-react-lite';

import styled from 'styled-components';

const MENU_TRANSITION_TIME = 0.25;

const lightGray = '#F1F1F1';

const SettingsContainer = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	background: #333333;
	height: calc(100% - 1px);
	border-radius: 5px 0 0 0;
	border: none;
	border-bottom: 1px solid #333333;
	overflow: hidden;
	color: ${lightGray};

	width: 0;
	transition: width ${MENU_TRANSITION_TIME}s ease-in-out;

	&.visible {
		width: ${ ({ theme }) => theme.settings.width }px;
	}

	h1 {
		text-align: center;
		border-top: 3px solid ${lightGray};
		border-bottom: 3px solid ${lightGray};
    margin: 0.2em 0 0.4em 0;
	}

	h2 {
		font-size: 1.1em;
    margin: 0.4em 0 0.4em 0;
	}
`;

const SettingsInnerContainer = styled.div`
	padding: 5px;
	text-align: left;
	overflow: hidden;
	width: calc(${ ({ theme }) => theme.settings.width }px - 10px);
`;

const FlagInputContainer = styled.div`
	display: block;
	padding: 0 0 5px 5px;

	input[type=radio] {
		appearance: none;
		display: inline-block;
		position: relative;
		background-color: #f1f1f1;
		color: #666;
		top: 5px;
		height: 20px;
		width: 20px;
		border: 0;
		border-radius: 50%;
		cursor: pointer;     
		margin-right: 7px;
		outline: none;
		transition: background ${MENU_TRANSITION_TIME}s ease-in-out;
	}

	input[type=radio]:checked::before {
		position: absolute;
		left: 5px;
		top: -8px;
		font-size: 1.5rem;
		content: '\\02143';
		transform: rotate(40deg);
		color: ${ ({ theme }) => theme.colors.mint };
		font-weight: bold;
	}

	input[type=radio]:hover {
		background-color: #999999;
	}

	input[type=radio]:checked {
		background-color: #f1f1f1;
	}

	label {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		cursor: pointer;
	}
`;

const Settings = observer(() => {

	let game = useGame();
	let settingsMenu = useSettingsMenu();

	const setFlagsOption = flags => game.quickRevealFlags = flags;

	const checkedOption = game.quickRevealFlags;

	return (
		<SettingsContainer className={ settingsMenu.visible && 'visible' }>
			<SettingsInnerContainer>
				<h1>Settings</h1>

				<h2>2-button click:</h2>

				<FlagInputContainer>
					<input 
						type='radio' 
						name='buttonClickOption' 
						value='flags' 
						id='flags'
						checked={ checkedOption } 
						onChange={ () => setFlagsOption(true) } 
					/>
					<label htmlFor='flags'>Mark Flags</label>

					<br/>

					<input 
						type='radio' 
						name='buttonClickOption' 
						value='reveal'
						id='reveal'
						checked={ !checkedOption }
						onChange={ () => setFlagsOption(false) } 
					/> 
					<label htmlFor='reveal'>Reveal Only</label>
				</FlagInputContainer>

			</SettingsInnerContainer>
		</SettingsContainer>
	);

});

export default Settings;