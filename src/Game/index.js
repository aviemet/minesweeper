import React, { useState } from 'react';

import Display from './Display';
import Board from './Board';

import styled from 'styled-components';

const GameBoard = styled.div`
	border: 1px solid white;
	margin: 0 auto;
	display: inline-block;
`;

const Game = () => {
	const [ height, setHeight ] = useState(8);
	const [ width, setWidth ] = useState(8);
	const [ mines, setMines ] = useState(10);

	return (
		<GameBoard>
			<Display 
				mines={mines}
			/>
			<Board 
				height={height}
				width={width}
				mines={mines}
			/>
		</GameBoard>
	);
}

export default Game;