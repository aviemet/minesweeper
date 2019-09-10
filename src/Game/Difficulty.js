import React from 'react';
import { useRoutes } from '../context/RouteStore';
import { useGame } from '../context/GameStore';
import Dropdown from '../components/Dropdown';

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const DifficultyContainer = styled.div`
	width: 100%;
	height: 39px;
	background-color: #333;
	border-radius: 0 0 5px 5px;
	text-align: left;
`;

const DifficultyPadding = styled.div`
	padding: 5px;
`;

/*
const Button = styled.button`
	margin: 5px;
	padding: 3px 8px;
	border-radius: 3px;
	border: solid 1px ${({ theme }) => theme.options.button.borderColor };
	background: ${({ theme }) => theme.options.button.background };
	color: ${({ theme }) => theme.options.button.color };
	font-family: sans-serif;
	font-size: 1rem;
	line-height: 1;
	text-decoration: none;
	cursor: pointer;
	text-align: center;
	transition: background 250ms ease-in-out, transform 150ms ease;
	appearance: none;
	display: inline-block;

	&:hover {
		background:  ${({ theme }) => theme.options.button.backgroundHover };
	}

`;
*/
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
	// return <Button onClick={ () => changeDifficulty(difficulty) }>{ children }</Button>
};


const Difficulty = props => {
	const game = useGame();
	
	return (
		<DifficultyContainer>
			<DifficultyPadding>
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

				{/* <Icon icon='cogs' /> */}

			</DifficultyPadding>
		</DifficultyContainer>
	)
}

export default Difficulty;