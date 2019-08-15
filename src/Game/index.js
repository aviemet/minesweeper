import React from 'react';

import Display from './Display';
import Board from './Board';

import styled from 'styled-components';

const GameBoard = styled.div`
	border: 1px solid white;
	margin: 0 auto;
	display: inline-block;
`;

const Game = () => {
	return (
		<GameBoard>
			<Display />
			<Board />
		</GameBoard>
	);
}

export default Game;