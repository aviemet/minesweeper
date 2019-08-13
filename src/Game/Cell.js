import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useGame } from '../context/GameStore';

const CellContainer = styled.div`
	width: 25px;
	height: 25px;
	border: 2px solid #666;
	display: inline-block;
	background: #444;
	overflow:hidden;

	&.hidden {
		background: white;
	}

	&.mine {
		background: red;

		&.loser {
			background: orange;
		}
	}

	&.flag {
		background: yellow;
	}
`;

const Cell = ({ x, y, mine, hidden, neighbors }) => {
	// const [ hidden, setHidden ] = useState(true);
	const [ loser, setLoser ] = useState(false);
	
	const [{ game }, dispatch] = useGame();

	const coord = game.getIndexFromCoords(x, y);
	const cell = game.board[coord];
	
	useEffect(() => {
		console.log(hidden)
		// if(game.board[coord].hidden !== hidden) setHidden(game.board[coord].hidden)

		// if(game.gameOver && hidden) setHidden(false)
	}, [hidden])

	const handleClick = e => {
		if(!game.gameOver) {
			e.stopPropagation();

			cell.hidden = false;

			if(mine) {
				game.explode();

				setLoser(true);

				dispatch({
					type: 'end'
				})

			} else {
				if(neighbors === 0) {
					console.log('exposing')
					game.exposeEmptyCells(x, y);
				}
			}
		}
	};

	const handleRightClick = e => {
		if(hidden) {
			// Mark with flag
		}
	}

	// Middle click
	const handleMouseDown = e => {
		if(e.button === 1 && !hidden) {
			// methods.exposeNeighbors(x, y);
		}
	}

	const classes = () => {
		let str = '';
		if(hidden) {
			str = 'hidden';
		} else {
			if(mine) {
				str = 'mine';
				if(loser) {
					str += ' loser';
				}
			} else if(neighbors > 0) {
				str = 'flag';
			}
		}
		return str;
	};


	return (
		<CellContainer
			onClick={handleClick}
			onContextMenu={handleRightClick}
			onMouseDown={handleMouseDown}
			className={classes()}
		>
			{!hidden && !mine && neighbors > 0 && neighbors}
			{/* {game.getIndexFromCoords(x,y)} */}
		</CellContainer>
	);
};

export default Cell;