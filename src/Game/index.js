import React from 'react';

import Display from './Display';
import Board from './Board';

import styled from 'styled-components';
import { useGame } from '../context/GameStore';

const GameBoard = styled.div`
	border: 1px solid white;
	margin: 0 auto;
	display: inline-block;
`;

const Game = () => {
	const game = useGame();

	return (
		<GameBoard>
			<Display 
				mines={game.mines}
			/>
			<Board />
		</GameBoard>
	);
}

export default Game;