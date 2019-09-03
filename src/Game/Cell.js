import React from 'react';
import styled from 'styled-components';
import { useGame } from '../context/GameStore';
import { observer } from 'mobx-react-lite';

const CellContainer = styled.div`
	width: ${({ theme }) => theme.cell.height };
	height: ${({ theme }) => theme.cell.height };
	border: 1px solid #666;
	display: inline-block;
	background: #444;
	overflow:hidden;

	background-position: center;
	background-size: 60%;
	background-repeat: no-repeat;

	&.hidden {
		background-color: rgb(136,147,245);
	}

	&.mine {
		background-color: red;

		background-image:url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="${({ theme }) => theme.icons.bomb.icon[0]}" height="${({ theme }) => theme.icons.bomb.icon[1]}" viewBox="0 0 ${({ theme }) => theme.icons.bomb.icon[0]} ${({ theme }) => theme.icons.bomb.icon[1]}"><path d="${({ theme }) => theme.icons.bomb.icon[4]}" ></path></svg>');

		&.loser {
			background-color: orange;
		}
	}

	&.flag {
		background-color: yellow;
		background-image:url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="${({ theme }) => theme.icons.flag.icon[0]}" height="${({ theme }) => theme.icons.flag.icon[1]}" viewBox="0 0 ${({ theme }) => theme.icons.flag.icon[0]} ${({ theme }) => theme.icons.flag.icon[1]}"><path d="${({ theme }) => theme.icons.flag.icon[4]}" ></path></svg>');
	}

	&.neighbors-one {
		color: #ADD8E6;
	}

	&.neighbors-two {
		color: #00AB66;
	}

	&.neighbors-three {
		color: #792F2F;
	}

	&.neighbors-four {
		color: #113EAC;
	}

	&.neighbors-five {
		color: #654321;
	}

	&.neighbors-six {
		color: #00FFFF;
	}

	&.neighbors-seven {
		color: #111111;
	}

	&.neighbors-eight {
		color: #999999;
	}
`;

const Cell = observer(({coord, cell}) => {
	const game = useGame();
	const { x, y, hidden, flag, mine, neighbors, loser } = cell;

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

		let cellClasses = [];

		if(hidden) {
			cellClasses.push('hidden');

			if(flag) cellClasses.push('flag');

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
		{!hidden && !mine && neighbors > 0 && neighbors}
		{/* {game.getIndexFromCoords(x,y)} */}
	</CellContainer>
);
	
});

export default Cell;