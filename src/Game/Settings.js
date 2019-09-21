import React from 'react';
import { useGame } from '../context/GameStore';
import { SettingsMenuContext } from '../context/SettingsMenuContext';
import { observer } from 'mobx-react-lite';

import styled from 'styled-components';

const SettingsContainer = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	background: white;
	height: 100%;
	width: 0;
	visibility: hidden;

	border-top: 1px solid ${ ({ theme }) => theme.board.border.color };
	border-bottom: 1px solid ${ ({ theme }) => theme.board.border.color };

	&.visible {
		width: 180px;
		visibility: visible;
	}
`;

const SettingsInnerContainer = styled.div`
	padding: 5px;
	text-align: left;
`;

const Settings = observer(() => {

	let game = useGame();

	const setFlagsOption = (flags) => {
		game.quickRevealFlags = flags;
	};

	const checkedOption = game.quickRevealFlags;

	return (
		<SettingsMenuContext.Consumer>{ settings => (
			<SettingsContainer className={ settings.visible && 'visible'}>
				<SettingsInnerContainer>
					<h1>Settings</h1>
					<form>

						<h2>2-button click:</h2>
						
						<input 
							type='radio' 
							name='buttonClickOption' 
							value='flags' 
							checked={ checkedOption } 
							onChange={ () => setFlagsOption(true) } 
						/>
						<label htmlFor='flags'>Mark Flags</label>

						<br/>

						<input 
							type='radio' 
							name='buttonClickOption' 
							value='reveal' 
							checked={ !checkedOption }
							onChange={ () => setFlagsOption(false) } 
						/> 
						<label htmlFor='reveal'>Reveal Only</label>

					</form>
				</SettingsInnerContainer>
			</SettingsContainer>
		) }</SettingsMenuContext.Consumer>
	);

});

export default Settings;