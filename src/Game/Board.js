import React from 'react';

import Cell from './Cell';
import Settings from './Settings';

import styled from 'styled-components';
import { useGame } from '../context/GameStore';
import { useRoutes } from '../context/RouteStore';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';

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
	position: relative;
`;

const Board = () => {

	const game = useGame();
	const { route, routeDispatcher } = useRoutes();

	const resetIfGameOver = () => {
		if(game.gameOver && !game.revealingMines) {
			routeDispatcher({
				type: 'navigate',
				page: '',
				difficulty: route.difficulty
			});
		}
	}

	// Right click
	const disableContextMenu = e => e.preventDefault();

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

			<Settings />
		
		</GameBoard>
	);
};

export default Board;