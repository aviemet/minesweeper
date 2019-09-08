import React from 'react';

import Cell from './Cell';

import styled from 'styled-components';
import { useGame } from '../context/GameStore';
import { useRoutes } from '../context/RouteStore';

const Row = styled.div`
	display: block;
	height: ${ ({ theme }) => theme.cell.height + (theme.cell.border.size * 2) }px;

	&.even .cell:nth-child(even) {
		filter: brightness(92%);
	}
	
	&.odd .cell:nth-child(odd) {
		filter: brightness(92%);
	}
`;

const GameBoard = styled.div`
	border: 1px solid ${ ({ theme }) => theme.board.border.color };

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
	const [{ difficulty }, routerDispatch] = useRoutes();

	const resetIfGameOver = () => {
		if(game.gameOver) {
			routerDispatch({
				type: 'navigate',
				page: '',
				difficulty
			});
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
					<Row key={y} className={ y % 2 === 0 ? 'even' : 'odd' }>{
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