import React, { useState } from 'react';
import styled from 'styled-components';

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
	}

	&.flag {
		background: yellow;
	}
`;

const Cell = ({x, y, mine, methods}) => {
	const [ hidden, setHidden ] = useState(true);
	const [ neighbors, setNeighbors ] = useState(0);

	const handleClick = e => {
		setHidden(false);
		if(mine) {
			methods.explode();
		} else {
			let n = methods.calculateNeighbors(x, y)
			setNeighbors(n);

			if(n === 0) {
				methods.exposeEmptyCells(x, y);
			}
		}
	};

	const handleRightClick = e => {
		e.preventDefault();
		if(hidden) {
			// Mark with flag
		}
	}

	// Middle click
	const handleMouseDown = e => {
		if(e.button === 1 && !hidden) {
			methods.exposeNeighbors(x, y);
		}
	}

	const classes = () => {
		let str = '';
		if(hidden) {
			str = 'hidden';
		} else {
			if(mine) {
				str = 'mine';
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
		</CellContainer>
	);
};

export default Cell;