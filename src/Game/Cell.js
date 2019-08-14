import React from 'react';
import styled from 'styled-components';
import { useGame } from '../context/GameStore';
import { observer } from 'mobx-react-lite';

const CellContainer = styled.div`
	width: 25px;
	height: 25px;
	border: 2px solid #666;
	display: inline-block;
	background: #444;
	overflow:hidden;

	&.hidden {
		background: rgb(136,147,245);
		background: linear-gradient(0deg, rgba(136,147,245,1) 0%, rgba(77,133,204,1) 100%);
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

	const handleMouseDown = e => game.clicks.add(e.button);

	const handleMouseUp = e => {
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