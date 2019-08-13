import React from 'react';

import Cell from './Cell';

import styled from 'styled-components';
import { useGame } from '../context/GameStore';
import { useRoutes } from '../context/Routes';

const Row = styled.div`
	display: block;
`;

const GameBoard = styled.div`
	border: 1px solid white;
`;

const Board = () => {

	const [{ game }] = useGame();
	console.log({game})
	const [{ currentPage }, routerDispatch] = useRoutes();

	const resetIfGameOver = () => {
		if(game.gameOver) {
			routerDispatch({
				type: 'navigate',
				page: ''
			})
		}
	}

	return (
		<GameBoard onClick={resetIfGameOver}>{
			[...Array(game.height)].map((_, y) => {
				return(
					<Row key={y}>{
						[...Array(game.width)].map((_, x) => {
							const coord = game.getIndexFromCoords(x, y);
							const cell = game.board[coord];
							return(
								<Cell
									key={coord}
									{...cell}
									gameOver={game.gameOver}
								/>
							)
						})
					}</Row>
				)
			})
		}
		</GameBoard>
	);
};

export default Board;