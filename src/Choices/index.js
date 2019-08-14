import React from 'react';
import styled from 'styled-components';
import { useGame } from '../context/GameStore';
import { useRoutes } from '../context/RouteStore';

const DifficultyButton = styled.div`
	width: 250px;
	height: 250px;
	text-align: center;
	background: white;
	font-size: 3rem;
	margin: 5px;
`;

const DifficultyChoice = props => {
	const game = useGame();
	const [{ currentPage }, routerDispatch] = useRoutes();

	const { width, height, mines } = props.dimensions;

	const startGame = () => {
		game.newGame(width, height, mines);

		routerDispatch({
			type: 'navigate',
			page: 'game'
		});
	};

	return(
		<DifficultyButton onClick={startGame}>
			{props.children}
		</DifficultyButton>
	);
};

const Choices = () => {
	return (
		<>
			<DifficultyChoice dimensions={{
				width: 8,
				height: 8,
				mines: 10
			}}>
				Easy
			</DifficultyChoice>
			<DifficultyChoice dimensions={{
				width: 15,
				height: 13,
				mines: 40
			}}>
				Medium
			</DifficultyChoice>
			<DifficultyChoice dimensions={{
				width: 30,
				height: 16,
				mines: 99
			}}>
				Hard
			</DifficultyChoice>
		</>
	)
}

export default Choices;