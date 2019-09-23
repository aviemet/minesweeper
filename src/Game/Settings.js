import React, { useState } from 'react';
import { useGame } from '../context/GameStore';
import { useRoutes } from '../context/RouteStore';
import { useSettingsMenu } from '../context/SettingsMenuContext';
import { observer } from 'mobx-react-lite';

import styled from 'styled-components';

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
	transition: width ${ ({ theme }) => theme.settings.transitionTime }s ease-in-out;

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
	width: ${ ({ theme }) => theme.settings.width - 10 }px;
`;

const InputContainer = styled.div`
	display: block;
	padding: 0 0 5px 5px;
`;

const BottomContainer = styled.div`
	position: absolute;
	bottom: 0;
	text-align: right;
	padding-right: 5px;
	overflow: hidden;

	button {
		background: none;
		border: none;
		padding: 0;
		font-size: 1.2em;
		text-decoration: underline;
		cursor: pointer;
		color: #F1F1F1;
		transition: color ${ ({ theme }) => theme.settings.transitionTime }s ease-in-out;
		overflow: hidden;
		display: block;
		width: ${ ({ theme }) => theme.settings.width - 10 }px;
	}

	button:hover {
		color: #CCCCCC;
	}
`;

const Settings = observer(() => {
	const game = useGame();
	const settingsMenu = useSettingsMenu();
	const { routeDispatcher } = useRoutes();

	const [ randomBg, setRandomBg ] = useState(JSON.parse(localStorage.getItem('bgenabled')));

	const flagsOptionChecked = game.quickRevealFlags;

	const setFlagsOption = value => game.quickRevealFlags = value;
	const toggleRandomBgOption = () => {
		// Timing issues with useState, cache the toggled value for both setters
		const newValue = !randomBg;
		setRandomBg(newValue);
		localStorage.setItem('bgenabled', newValue);
	}

	const showScoreBoard = () => {
		routeDispatcher({
			type: 'navigate',
			page: 'scores',
		});
	}

	return (
		<SettingsContainer className={ settingsMenu.visible && 'visible' }>
			<SettingsInnerContainer>
				<h1>Settings</h1>

				<h2>2-button click:</h2>

				<InputContainer>
					<input 
						type='radio' 
						name='buttonClickOption' 
						value='flags' 
						id='flags'
						checked={ flagsOptionChecked } 
						onChange={ () => setFlagsOption(true) } 
					/>
					<label htmlFor='flags'>Mark Flags</label>

					<br/>

					<input 
						type='radio' 
						name='buttonClickOption' 
						value='reveal'
						id='reveal'
						checked={ !flagsOptionChecked }
						onChange={ () => setFlagsOption(false) } 
					/> 
					<label htmlFor='reveal'>Reveal Only</label>
				</InputContainer>

				<h2>Background Image</h2>
				<InputContainer>
					<input 
						type='checkbox'
						name='randomBgOption'
						value='randomBg'
						id='randomBg'
						checked={ randomBg }
						onChange={ () => toggleRandomBgOption() }
					/>
					<label htmlFor='randomBg'>Randomize</label>
				</InputContainer>

				<BottomContainer>
					<button onClick={ showScoreBoard }>Score Board</button>
				</BottomContainer>


			</SettingsInnerContainer>
		</SettingsContainer>
	);

});

export default Settings;