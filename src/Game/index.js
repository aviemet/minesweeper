import React from 'react';

import Display from './Display';
import Board from './Board';
import Difficulty from './Difficulty';

import styled from 'styled-components';

const GameContainer = styled.div`
	margin: 0 auto;
	top: 40%;
	position: relative;
	transform: translateY(-50%);
`;

const GameBoard = styled.div`
	margin: 0 auto;
	display: inline-block;
	padding: 10px;
	border-radius: 10px;
	box-shadow: ${ ({theme}) => theme.board.shadow };
	background: ${ ({theme}) => theme.board.background };
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