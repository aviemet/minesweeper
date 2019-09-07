import React from 'react';

import Display from './Display';
import Board from './Board';
import Difficulty from './Difficulty';

import styled from 'styled-components';

const GameContainer = styled.div`
	margin: 0 auto;
	top: 50%;
	position: relative;
	transform: translateY(-50%);
`;

const GameBoard = styled.div`
	margin: 0 auto;
	display: inline-block;
	padding: 10px;
	border-radius: 10px;
	box-shadow: 0 0 10px #666;
	background: rgba(255,255,255,0.75);
`;

const Game = () => {
	return (
		<GameContainer>
			<GameBoard>
				<Display />
				<Board />
				<Difficulty />
			</GameBoard>
		</GameContainer>
	);
}

export default Game;