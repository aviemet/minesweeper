import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { useGame } from '../context/GameStore';
import { observer } from 'mobx-react-lite';

const CellContainer = styled.div`
	width: ${({ theme }) => theme.cell.height };
	height: ${({ theme }) => theme.cell.height };
	border: 1px solid #666;
	display: inline-block;
	overflow:hidden;
	position: relative;

	background-position: center;
	background-size: 60%;
	background-repeat: no-repeat;
	background-color: ${({ theme }) => theme.cell.bgColorRevealed };

	&.hidden {
		background-color: ${({ theme }) => theme.cell.bgColorHidden };

		&:hover {
			background-color: ${({ theme }) => theme.cell.bgColorHover };
		}
	}

	&.flag {
		color: ${({ theme }) => theme.flag.color };
	}

	&.mine {
		color: #580f0f;
		background-color: #ea8239;

		&.loser {
			background-color: #dc3636;
			color: #ea8239;
		}

		&.flag {
			color: #222222;
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
		color: #1976d2;
	}

	&.neighbors-two {
		color: #419141;
	}

	&.neighbors-three {
		color: #419141;
	}

	&.neighbors-four {
		color: #419141;
	}

	&.neighbors-five {
		color: #ff8f00;
	}

	&.neighbors-six {
		color: #419141;
	}

	&.neighbors-seven {
		color: #111111;
	}

	&.neighbors-eight {
		color: #999999;
	}
`;

const Cell = observer(({ cell }) => {
	const game = useGame();
	const { hidden, flag, mine, neighbors, loser } = cell;

	// Prevent losing click from also resetting the board;
	const handleClick = e => {
		if(!game.gameOver) e.stopPropagation();
	};

	// Delegate click handling to Game object to allow moving mouse during mousedown
	// to different cell. Allows any cell to handle the mouseup event while also 
	// detecting the left+right click action
	const handleMouseDown = e => game.clicks.add(e.button);

	const handleMouseUp = e => {
		// If right and left button pressed, use quick reveal
		if(game.clicks.has(0) && game.clicks.has(2)) {
			game.clicks.clear();
			cell.quickReveal();
		} else {
			if(game.clicks.has(e.button)) {
		
				switch(e.button) {
					case 0: // Left Click
						cell.reveal();					
						break;
					case 1: // Middle Click
						break;
					case 2: // Right Click
						cell.toggleFlag()
						break;
					default:
				}

			}
			game.clicks.delete(e.button);
		}

		if(game.checkForVictory()) {
			e.stopPropagation();
			console.log('Victory!')
		}
	}

	const classes = () => {
		const neighborClasses = [null, 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight' ];

		let cellClasses = ['cell'];


		if(flag) cellClasses.push('flag');

		if(hidden) {
			cellClasses.push('hidden');
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
			onClick={handleClick}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			className={classes()}
		>
			<span>
				{!hidden && !mine && neighbors > 0 && neighbors}
				{hidden && flag && <Icon icon='flag' />}
				{!hidden && mine && game.gameOver && <Icon icon='bomb' />}
			</span>
		</CellContainer>
	);
	
});

export default Cell;