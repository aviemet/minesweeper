class MinesweeperGame {
	board = [[]];
	width = 0;
	height = 0;
	mines = 0;
	mineLocations = new Map();
	gameOver = false;

	newGame(width, height, mines) {
		this.gameOver = false;
		this.width = width;
		this.height = height;
		this.mines = mines;
		this.board = this._buildBoard(width, height, mines);
	}

	revealCell(x, y) {
		this.board[this.getIndexFromCoords(x,y)].hidden = false;
	}

	getCoordsFromIndex(index) {
		const x = index % this.width;
		const y = Math.floor(index / this.width);

		return { x, y };
	}

	getIndexFromCoords(x, y) {
		return (this.width * y) + x;
	}

	/**
	 * Create x * y array of objects with cell data
	 */
	_buildBoard() {
		this.mineLocations = this._plantMines();
		
		let grid = [];
		for(let y = 0; y < this.height; y++) {
			for(let x = 0; x < this.width; x++) {
				const coord = this.getIndexFromCoords(x, y);
				grid.push({
					x,
					y,
					mine: this.mineLocations.has(coord),
					neighbors: 0,
					hidden: true
				});
			}
		}
		
		this._calcNeighboringMines(grid);
	
		return grid;
	}
	
	/**
	 * Store map of random mine locations
	 */
	_plantMines() {
		let mineLocations = new Set();
		let randomx, randomy = 0;
	
		while(mineLocations.size < this.mines) {
			randomx = Math.floor(Math.random() * this.width);
			randomy = Math.floor(Math.random() * this.height);
			const coord = this.getIndexFromCoords(randomx, randomy);
			mineLocations.add(coord);
		}
		return mineLocations;
	}
	
	/**
	 * Pre calculate the neighboring mine count for each cell
	 */
	_calcNeighboringMines(grid) {
		const movements = [-1,0,1];
		
		this.mineLocations.forEach((value, index) => {
			const { x, y } = this.getCoordsFromIndex(index);
			
			movements.forEach(xdir => {
				movements.forEach(ydir => {
					if(xdir !== 0 || ydir !== 0){ // self check
						let xcoord = x + xdir;
						let ycoord = y + ydir;

						const coord = this.getIndexFromCoords(xcoord, ycoord);

						if(xcoord >= 0 && xcoord < this.width    // x bounds check
							&& ycoord >= 0 && ycoord < this.height // y bounds check
							&& !grid[coord].mine                   // mine check
							) { 
							grid[coord].neighbors++;
						}
					}
				});
			});
		});
	}

	/**
	 * Trigger end of game
	 */
	explode(x, y) {
		this.gameOver = true;
		this.board.forEach(cell => {
			cell.hidden = false;
		});
		console.log('You Lost');
	}

	/**
	 * Middle click action, game shortcut
	 */
	exposeNeighbors(x, y) {
		// Mark known mines
		// Expose known non-mine neighbors
	}

	/**
	 * Expose group of empty cells when clicking on an empty cell
	 */
	exposeEmptyCells(x, y) {
		const cellsToExpose = new Set();
		const movements = [-1,0,1];

		// Each surrounding cell
		movements.forEach(xdir => {
			movements.forEach(ydir => {
				if(xdir !== 0 || ydir !==0) {
					let xcoord = x + xdir;
					let ycoord = y + ydir;

					const coord = this.getIndexFromCoords(xcoord, ycoord);
					// If it's a valid board location

					if(xcoord >= 0 && xcoord < this.width    // x bounds check
						&& ycoord >= 0 && ycoord < this.height // y bounds check
						&& !this.board[coord].mine             // mine check
						){
						// If it's not a mine and has no neighbors
						if(!this.board[coord].mine && this.board[coord].neighbors === 0) {
							// Add to set
							cellsToExpose.add(coord);
							this.board[coord].hidden = false;
							// this.exposeEmptyCells(xcoord, ycoord);
						}
					}
				}
			});
		});
	}
}

export default MinesweeperGame;