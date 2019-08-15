import { observable } from "mobx";

class MinesweeperGame {
	width = 0;
	height = 0;
	mineLocations = new Map();
	
	@observable mines = 0;
	@observable flags = 0;
	@observable clicks = new Set();
	@observable board = [];
	@observable gameOver = false;

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
	 * @param {int} mines Number of mines
	 */
	newGame(width, height, mines) {
		// TODO: bounds check for mines
		this.gameOver = false;
		this.width = width;
		this.height = height;
		this.mines = mines;
		this._buildBoard(width, height, mines);
	}

	/**
	 * Expose group of empty cells when clicking on an empty cell
	 */
	exposeEmptyCells(x, y, set) {
		if(!set) set = new Set();

		const initialCoord = this.getIndexFromCoords(x, y);

		this.board[initialCoord].surroundingCells((cell, coord) => {
			cell.hidden = false;

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

			// Reveal Mines
			this.mineLocations.forEach(coord => {
				this.board[coord].hidden = false;
			});
		}, 1);
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
		
		this._calcNeighboringMines();
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
	 * Pre calculate the neighboring mine count for each cell
	 */
	_calcNeighboringMines() {
		this.mineLocations.forEach((coord) => {
			this.board[coord].surroundingCells(cell => {
				if(!cell.mine) {
					cell.neighbors++;
				}
			});
		});
	}
}

class Cell {
	@observable hidden;
	@observable flag;
	@observable loser = false;
	hidden = true;
	flag = false;
	neighbors = 0;

	constructor(x, y, mine, game) {
		this.x = x;
		this.y = y;
		this.mine = mine || false;
		this.game = game;
	}

	toggleFlag() {
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
	reveal() {		
		if(this.flag) {
			return;
		} else if(this.mine) {
			this.explode();
		} else if(this.neighbors === 0) {
			this.game.exposeEmptyCells(this.x, this.y);
		}
		this.hidden = false;
	}

	/**
	 * Trigger end of game
	 */
	explode() {
		if(this.game.gameOver) return;

		this.loser = true;
		this.game.endGame();
	}

	quickReveal() {
		let count = this.neighbors;
		let hiddenUnflaggedNeighbors = 0;

		// Test if flagged neighbors is equal to neighboring mine count
		this.surroundingCells(cell => {
			if(cell.flag) count--;
			if(cell.hidden && !cell.flag) hiddenUnflaggedNeighbors++;
		});

		if(count === 0) {
			this.surroundingCells(cell => {
				if(cell.hidden) cell.reveal();
			});
		} else if(count === hiddenUnflaggedNeighbors) {
			this.surroundingCells(cell => {
				if(cell.hidden) cell.flag = true;
			});
		}
		console.log({count});
	}

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