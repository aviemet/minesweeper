import React from 'react';

import Display from './Display';
import Board from './Board';

import styled from 'styled-components';

const GameContainer = styled.div`
	width: 1100px;
	margin: 0 auto;
`;

const GameBoard = styled.div`
	margin: 0 auto;
	display: inline-block;
`;

const Game = () => {
	return (
		<GameContainer>
			<GameBoard>
				<Display />
				<Board />
			</GameBoard>
		</GameContainer>
	);
}

export default Game;