import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { useGame } from '../context/GameStore';
import { observer } from 'mobx-react-lite';

const CellContainer = styled.div`
	width: ${ ({ theme }) => theme.cell.height }px;
	height: ${ ({ theme }) => theme.cell.height }px;
	border: ${ ({ theme }) => theme.cell.border.size }px solid ${ ({ theme }) => theme.cell.border.color };
	display: inline-block;
	overflow:hidden;
	position: relative;

	background-position: center;
	background-size: 60%;
	background-repeat: no-repeat;
	background-color: ${ ({ theme }) => theme.cell.bgColorRevealed };

	&.hidden {
		background-color: ${ ({ theme }) => theme.cell.bgColorHidden };

		&:hover, &.highlight {
			background-color: ${ ({ theme }) => theme.cell.bgColorHover };
		}
	}

	&.flag {
		color: ${ ({ theme }) => theme.flag.color };
	}

	&.mine {
		color: ${ ({ theme }) => theme.mine.color };
		background-color: ${ ({ theme }) => theme.mine.background };

		&.loser {
			color: ${ ({ theme }) => theme.mine.exploded.color };
			background-color: ${ ({ theme }) => theme.mine.exploded.background };
		}

		&.flag {
			color: ${ ({ theme }) => theme.flag.correct.color };
			background-color: ${ ({ theme }) => theme.flag.correct.background };
		}
	}

	span {
		position: absolute;
    top: 50%;
    left: 50%;
		transform: translate(-50%, -50%);
		font-weight: bold;
	}

	&.neighbors-one {
		color: ${ ({ theme }) => theme.cell.neighbors.one };
	}

	&.neighbors-two {
		color: ${ ({ theme }) => theme.cell.neighbors.two };
	}

	&.neighbors-three {
		color: ${ ({ theme }) => theme.cell.neighbors.three };
	}

	&.neighbors-four {
		color: ${ ({ theme }) => theme.cell.neighbors.four };
	}

	&.neighbors-five {
		color: ${ ({ theme }) => theme.cell.neighbors.five };
	}

	&.neighbors-six {
		color: ${ ({ theme }) => theme.cell.neighbors.six };
	}

	&.neighbors-seven {
		color: ${ ({ theme }) => theme.cell.neighbors.seven };
	}

	&.neighbors-eight {
		color: ${ ({ theme }) => theme.cell.neighbors.eight };
	}
`;

const Cell = observer(({ cell }) => {
	const game = useGame();
	const { hidden, flag, mine, neighbors, loser, highlight } = cell;

	// Prevent losing click from also resetting the board;
	const handleClick = e => {
		if(!game.gameOver) e.stopPropagation();
	};

	// Delegate click handling to Game object to allow moving mouse during mousedown
	// to different cell. Allows any cell to handle the mouseup event while also 
	// detecting the left+right click action
	const handleMouseDown = e => {
		game.clicks.add(e.button);

		// If right and left button pressed, highlight surrounding cells
		if(game.clicks.has(0) && game.clicks.has(2)) {
			cell.highlightSurrounding(true);
		}
	}

	const handleMouseUp = e => {
		// If right and left button pressed, use quick reveal
		if(game.clicks.has(0) && game.clicks.has(2)) {
			// Clear all clicks to prevent mouseup detection on other buttons
			game.clicks.clear();
			cell.quickReveal();
			cell.highlightSurrounding(false);
		} else {
			switch(e.button) {
				case 0: // Left Click
					cell.reveal();					
					break;
				case 1: // Middle Click
					cell.quickReveal();
					break;
				case 2: // Right Click
					cell.toggleFlag()
					break;
				default:
			}
			game.clicks.delete(e.button);
		}

		if(game.checkForVictory()) {
			e.stopPropagation();
		}
	}

	const handleMouseOver = e => {
		if(game.clicks.has(0) && game.clicks.has(2)) {
			cell.highlightSurrounding(true);
		}
	}

	const handleMouseOut = e => {
		if(game.clicks.has(0) && game.clicks.has(2)) {
			cell.highlightSurrounding(false);
		}
	}

	const classes = () => {
		const neighborClasses = [null, 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight' ];

		let cellClasses = ['cell'];


		if(flag) cellClasses.push('flag');

		if(hidden) {
			cellClasses.push('hidden');

			if(!flag && highlight) {
				cellClasses.push('highlight');
			}
		} else {
			if(mine) {
				cellClasses.push('mine');
				if(loser) cellClasses.push('loser');
			} else if(neighbors > 0) {
				cellClasses.push(`neighbors-${neighborClasses[neighbors]}`);
			}
		}

		return cellClasses.join(' ');
	};

	return (
		<CellContainer
			onClick={ handleClick }
			onMouseDown={ handleMouseDown }
			onMouseUp={ handleMouseUp }
			onMouseOver={ handleMouseOver }
			onMouseOut={ handleMouseOut }
			className={classes()}
		>
			<span>
				{!hidden && !mine && neighbors > 0 && neighbors}
				{( (hidden && flag) || (!hidden && flag && mine) ) && <Icon icon='flag' />}
				{!hidden && mine && !flag && game.gameOver && <Icon icon='bomb' />}
			</span>
		</CellContainer>
	);
	
});

export default Cell;