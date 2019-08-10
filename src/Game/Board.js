import React from 'react';

import Cell from './Cell';

import styled from 'styled-components';

const Row = styled.div`
	display: block;
`;

const Board = ({height, width, mines}) => {
	
	const plantMines = () => {
		let mineLocations = new Map();
		let randomx, randomy = 0;

		while(mineLocations.size < mines) {
			randomx = Math.floor(Math.random() * width);
			randomy = Math.floor(Math.random() * height);
			mineLocations.set((randomy * width) + randomx, true);
		}
		return mineLocations;
	};

	const mineLocations = plantMines();

	const calculateNeighbors = (x, y) => {
		let neighbors = 0;

		[-1,0,1].forEach(xdir => {
			[-1,0,1].forEach(ydir => {
				let xcoord = x + xdir;
				let ycoord = y + ydir;

				if(xcoord >= 0 && xcoord <= width && ycoord >= 0 && ycoord <= height) {
					if(mineLocations.has((xcoord * width) + ycoord)) neighbors++;
				}

			});
		});

		return neighbors;
	};

	const explode = (x, y) => {
		// Expose all mines
		// Trigger game lost
		console.log('You Lost');
	};

	// Middle click 
	const exposeNeighbors = (x, y) => {
		// Mark known mines
		// Expose known non-mine neighbors
	};

	const exposeEmptyCells = (x, y) => {
		// Expose group of empty cells
	};

	const buildBoard = () => {
		let grid = [];
		for(let i = 0; i < height; i++) {
			let row = [];
			for(let j = 0; j < width; j++) {
				row.push(<Cell 
					key={(i * width) + j} 
					x={j}
					y={i}
					mine={mineLocations.has((j * width) + i)}
					methods={{
						calculateNeighbors,
						explode,
						exposeNeighbors,
						exposeEmptyCells
					}}
				/>);
			}
			grid.push(row);
		}
		return grid;
	};

	const board = buildBoard();

	return (
		<div>{board.map((row, i) => (
				<Row key={i}>{
					row.map((cell, j) => (
						cell
				))}</Row>
			))
		}</div>
	);
};

export default Board;