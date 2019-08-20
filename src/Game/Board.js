import React from 'react';

import Cell from './Cell';

import styled from 'styled-components';
import { useGame } from '../context/GameStore';
import { useRoutes } from '../context/RouteStore';

const Row = styled.div`
	display: block;
	height: 27px;
`;

const GameBoard = styled.div`
	border: 1px solid #666;

	/* Disable text highlighting */
	-webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
`;

const Board = () => {

	const game = useGame();
	const [{ currentPage }, routerDispatch] = useRoutes();

	const resetIfGameOver = () => {
		if(game.gameOver) {
			routerDispatch({
				type: 'navigate',
				page: ''
			})
		}
	}

	// Right click
	const disableContextMenu = e => {
		e.preventDefault();
	}

	return (
		<GameBoard 
			onClick={resetIfGameOver}
			onContextMenu={disableContextMenu}
		>{
			[...Array(game.height)].map((_, y) => {
				return(
					<Row key={y}>{
						[...Array(game.width)].map((_, x) => {
							const coord = game.getIndexFromCoords(x, y);
							const cell = game.board[coord];
							return(
								<Cell
									key={coord}
									coord={coord}
									cell={cell}
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