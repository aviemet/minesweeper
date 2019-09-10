import { observable, action } from "mobx";

class MinesweeperGame {
	width = 0;
	height = 0;
	mineLocations = new Set();
	revealingMines = false;

	difficulty = {
		EASY: { width: 8, height: 8, mines: 10 },
		MEDIUM: { width: 15, height: 13, mines: 40 },
		HARD: { width: 30, height: 16, mines: 99 }
	};
	
	@observable mines = 0;
	@observable flags = 0;
	@observable clicks = new Set();
	@observable board = [];
	@observable revealedCells = 0;
	@observable gameStarted = false;
	@observable gameOver = false;
	@observable winner = false;

	getCoordsFromIndex(index) {
		const x = index % this.width;
		const y = Math.floor(index / this.width);

		return { x, y };
	}

	getIndexFromCoords(x, y) {
		return (this.width * y) + x;
	}

	/**
	 * Start a new game
	 * @param {int} width Width of game board
	 * @param {int} height Height of game board
	 * @param {int} mines Number of minesKrishna3.141
	 * 
	 */
	@action
	newGame({ width, height, mines }) {
		// TODO: bounds check for mines
		this.gameOver = false;
		this.gameStarted = false;
		this.winner = false;
		this.width = width;
		this.height = height;
		this.mines = mines;
		this.flags = 0;
		this.revealedCells = 0;
		this._buildBoard(width, height, mines);
	}

	/**
	 * Expose group of empty cells when clicking on an empty cell
	 */
	exposeEmptyCells(x, y, set) {
		if(!set) set = new Set();

		const initialCoord = this.getIndexFromCoords(x, y);

		this.board[initialCoord].surroundingCells((cell, coord) => {
			cell.reveal();

			// Recurse if it has neighboring mine count of 0 and hasn't been touched yet
			if(cell.neighbors === 0 && !set.has(coord)) {
				set.add(coord);
				this.exposeEmptyCells(cell.x, cell.y, set);
			}
		});		
	}

	endGame() {
		// Wait a tick to allow click event propagation
		setTimeout(() => {
			this.gameOver = true;

			const animate = !this.winner;
			this._revealMines(animate);
		}, 1);
	}

	/**
	 * Reveals all mines at end of game
	 * Animates reveal of remaining mines if lost
	 */
	_revealMines(animate) {
		this.revealingMines = true; // Lock flag during mines reveal

		if(animate === true) {
			let revealPromises = [];

			this.mineLocations.forEach(coord => {
				revealPromises.push(new Promise((resolve, reject) => {
					setTimeout(() => {
						resolve(this.board[coord].hidden = false);
					}, Math.floor(Math.random() * 1000)); // "Animate" with random reveal time between 0 and 1 second
				}));
			});

			// Use Promises to wait for all mines to be revealed, then unset flag
			Promise.all(revealPromises).then(() => this.revealingMines = false);
		} else {
			this.mineLocations.forEach(coord => {
				this.board[coord].hidden = false;
			});
			this.revealingMines = false;
		}
	}

	/**
	 * Build 1D array representing game board
	 * Instantiate new cell for each position
	 */
	_buildBoard() {
		this.mineLocations = this._plantMines();
		
		this.board = [];
		for(let y = 0; y < this.height; y++) {
			for(let x = 0; x < this.width; x++) {
				const coord = this.getIndexFromCoords(x, y);
				this.board.push(new Cell( x, y, this.mineLocations.has(coord), this ));
			}
		}
	}
	
	/**
	 * Store set of random mine locations
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
	 * Changes cell and surrounding cells from mines to empty
	 * Used to ensure that the first click results in a playable game
	 */
	@action
	ensurePleasantStart(cell) {
		let removedMines = new Set();
			
		const index = this.getIndexFromCoords(cell.x, cell.y);

		if(cell.mine) {
			cell.mine = false;
			this.mineLocations.delete(index);
			removedMines.add(index);
		}

		cell.surroundingCells((cell, coord) => {
			if(cell.mine) {
				cell.mine = false;
				this.mineLocations.delete(coord);
				removedMines.add(coord);
			}
		});
		this._topUpMines(removedMines);
	}

	/**
	 * If first click is a mine, method in Cell object removes that and surrounding mines
	 * Use this method to top up mine count after this happens
	 * @param {Set} ignoredIndices
	 */
	_topUpMines(ignoredIndices) {
		let randomx, randomy = 0;
	
		while(this.mineLocations.size < this.mines) {
			randomx = Math.floor(Math.random() * this.width);
			randomy = Math.floor(Math.random() * this.height);
			const index = this.getIndexFromCoords(randomx, randomy);

			if(!ignoredIndices.has(index)) {
				console.log({index})
				this.mineLocations.add(index);
				this.board[index].mine = true;
			}
			
		}
	}

	checkForVictory() {
		if(this.board.length - this.revealedCells === this.mines) {
			this.winner = true;
			this.endGame();
			return true;
		}
		return false;
	}

}

class Cell {
	@observable hidden;
	@observable flag;
	@observable loser = false;
	@observable mine = false;
	@observable hidden = true;
	@observable flag = false;
	@observable neighbors = 0;

	constructor(x, y, mine, game) {
		this.x = x;
		this.y = y;
		this.mine = mine;
		this.game = game;
	}

	@action
	toggleFlag() {
		if(this.game.gameOver) return;
		
		if(this.hidden) {
			this.flag = !this.flag;
		}

		if(this.flag) {
			this.game.flags++;
		} else {
			this.game.flags--;
		}
	}

	/**
	 * Action for player clicking a square
	 * @param {int} x X coordinate
	 * @param {int} y Y coordinate
	 */
	@action
	reveal() {
		if(this.game.gameOver) return;

		// Actions for first click of the game
		if(this.game.revealedCells === 0) {
			this.game.gameStarted = true;

			// If first clicked cell is a mine, rearrange mines
			this.game.ensurePleasantStart(this);
		}

		// Do nothing if clicking on a flag or a revealed cell
		if(this.flag || !this.hidden) return;
		
		// Clicking a mine ends the game
		if(this.mine) {
			this.hidden = false;
			this.explode();
		} else {
			// Count neighboring mines
			this.neighbors = this._countNeighboringMines();
			this.hidden = false;
			this.game.revealedCells++;

			// Cascade reveal empty cells
			if(this.neighbors === 0) {
				
				this.surroundingCells((cell, coord) => {
					if(cell.hidden) {
						cell.reveal();
					}
				});
			}
		}
	}

	/**
	 * Return the neighboring mine count
	 */
	_countNeighboringMines() {
		let mineCount = 0;
		this.surroundingCells((cell, coord) => {
			if(cell.mine) mineCount++;
		});
		return mineCount;
	}

	/**
	 * Trigger end of game
	 */
	@action
	explode() {
		if(this.game.gameOver) return;

		this.loser = true;
		this.game.endGame();
	}

	@action
	quickReveal() {
		let count = this.neighbors;
		let hiddenUnflaggedNeighbors = 0;

		// Test if flagged neighbors is equal to neighboring mine count
		this.surroundingCells(cell => {
			if(cell.flag) count--;
			if(cell.hidden && !cell.flag) hiddenUnflaggedNeighbors++;
		});

		// If the neighboring mines count and the flags count is the same,
		// Reveal the surrounding unflagged cells
		if(count === 0) {
			this.surroundingCells(cell => {
				if(cell.hidden) cell.reveal();
			});
		// If the neighboring mines count is the same as hidden neighbors
		// Flag the neighboring cells
		} else if(count === hiddenUnflaggedNeighbors) {
			this.surroundingCells(cell => {
				if(cell.hidden && !cell.flag) cell.toggleFlag();
			});
		}
	}

	/**
	 * Iteratator for surrounding cells
	 */
	surroundingCells(fn) {
		const movements = [-1,0,1];

		// Each surrounding cell
		movements.forEach(xdir => {
			movements.forEach(ydir => {
				if(xdir !== 0 || ydir !==0) {
					let xcoord = this.x + xdir;
					let ycoord = this.y + ydir;

					const coord = this.game.getIndexFromCoords(xcoord, ycoord);

					// If it's a valid board location
					if(xcoord >= 0 && xcoord < this.game.width    // x bounds check
						&& ycoord >= 0 && ycoord < this.game.height // y bounds check
						){
						fn(this.game.board[coord], coord);
					}
				}
			})
		});
	}
}

export default MinesweeperGame;