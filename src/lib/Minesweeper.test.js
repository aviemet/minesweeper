import Minesweeper from './Minesweeper';
import { toJS } from "mobx";

let game = new Minesweeper();

describe('Minesweeper Object', () => {
	beforeAll(() => {
		game = new Minesweeper();
	})

	it('Should instantiate', () => {
		const board = toJS(game.board);
		expect(game).toBeInstanceOf(Minesweeper);
		expect(board).toEqual([]);
	});
});

describe('Game board', () => {
	beforeAll(() => {
		game = new Minesweeper();
		game.newGame(game.difficulty.EASY);
	})

	test('New game method should build a game board', () => {
		const boardLength = game.difficulty.EASY.width * game.difficulty.EASY.height;
		expect(game.board.length).toEqual(boardLength);
	});

	test('Coordinate / index converter to succeed with valid values', () => {
		const i = 10;
		const coords = game.getCoordsFromIndex(i);
		const { x, y } = coords;
		const index = game.getIndexFromCoords(x, y);

		expect(coords).toEqual({ x: 2, y: 1 });
		expect(index).toEqual(i);
	});

	
});