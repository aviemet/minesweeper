import React from 'react';
import { useRoutes } from '../context/RouteStore';
import { useGame } from '../context/GameContext';
import Dropdown from '../components/Dropdown';
import SettingsButton from './SettingsButton';

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

const DifficultyButton = ({ difficulty, children }) => {
	const { routeDispatcher } = useRoutes();

	const changeDifficulty = difficulty => {
		routeDispatcher({
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