import React from 'react';
import { useRoutes } from '../context/RouteStore';
import { useGame } from '../context/GameStore';
import Dropdown from '../components/Dropdown';

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const MenuContainer = styled.div`
	width: 100%;
	height: ${ ({ theme }) => theme.difficulty.height }px;
	background-color: #333;
	border-radius: 0 0 5px 5px;
	text-align: left;
`;

const MenuPadding = styled.div`
	padding: ${ ({ theme }) => theme.difficulty.padding }px;
	position: relative;
`;

const SettingsMenuContainer = styled.div`
	float: right;
	color: white;
	display: inline-block;
	text-align: right;
	height: ${ ({ theme }) => theme.difficulty.height - (theme.difficulty.padding * 2) }px;

	& > svg {
		top: 50%;
		position: relative;
		transform: translateY(-50%);
	}
`;

const DifficultyButton = ({ difficulty, children }) => {
	const [{}, routerDispatch] = useRoutes();

	const changeDifficulty = difficulty => {
		routerDispatch({
			type: 'navigate',
			page: '',
			difficulty
		});
	};

	return (
		<div onClick={ () => changeDifficulty(difficulty) }>
			{ children }
		</div>
	);
};

const SettingsButton = () => {
	
	const toggleSettingsMenu = () => {

	};

	return (
		<SettingsMenuContainer>
			<Icon icon='cogs' size='lg' onClick={ toggleSettingsMenu }/>
		</SettingsMenuContainer>
	);
};


const MenuBar = props => {
	const game = useGame();
	
	return (
		<MenuContainer>
			<MenuPadding>
				<Dropdown heading="Difficulty">
					<Dropdown.Item>
						<DifficultyButton difficulty={game.difficulty.EASY}>Easy</DifficultyButton>
					</Dropdown.Item>
					<Dropdown.Item>
						<DifficultyButton difficulty={game.difficulty.MEDIUM}>Medium</DifficultyButton>
					</Dropdown.Item>
					<Dropdown.Item>
						<DifficultyButton difficulty={game.difficulty.HARD}>Hard</DifficultyButton>
					</Dropdown.Item>
				</Dropdown>

				<SettingsButton />

			</MenuPadding>
		</MenuContainer>
	)
}

export default MenuBar;