import React from 'react';
import { useRoutes } from '../context/RouteStore';
import { useGame } from '../context/GameStore';

import styled from 'styled-components';

const DifficultyContainer = styled.div`
	width: 100%;
	height: 35px;
	background-color: #333;
	border-radius: 0 0 5px 5px;
`;

const Button = styled.button`
	margin: 5px;
	padding: 3px 8px;
	border-radius: 3px;
	border: solid 1px #999999;
	display: inline-block;
	text-decoration: none;
	background: #CCCCCC;
	color: #111111;
	font-family: sans-serif;
	font-size: 1rem;
	line-height: 1;
	cursor: pointer;
	text-align: center;
	transition: background 250ms ease-in-out, transform 150ms ease;
	appearance: none;

	&:hover {
		background: #AAAAAA;
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

	return <Button onClick={ () => changeDifficulty(difficulty) }>{ children }</Button>
};


const Difficulty = props => {
	const game = useGame();
	
	return (
		<DifficultyContainer>
			<DifficultyButton difficulty={game.difficulty.EASY}>Easy</DifficultyButton>
			<DifficultyButton difficulty={game.difficulty.MEDIUM}>Medium</DifficultyButton>
			<DifficultyButton difficulty={game.difficulty.HARD}>Hard</DifficultyButton>
		</DifficultyContainer>
	)
}

export default Difficulty;