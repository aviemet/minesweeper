import React, { createContext, useContext, useReducer } from 'react';
import MinesweeperGame from '../lib/Minesweeper';

export const GameContext = createContext();

export const GameProvider = ({children}) => {
	const initialState = {
		game: new MinesweeperGame()
	};

	const reducer = (state, action) => {
		switch (action.type) {
			case 'end':
				return {
					...state
				}
			case 'new':
				const { width, height, mines } = action.args;
				state.game.newGame(width, height, mines);
				return {
					...state
				}
			default:
				return state;
		}
	}

	return(
		<GameContext.Provider value={useReducer(reducer, initialState)}>
			{children}
		</GameContext.Provider>
	);
};

export const useGame = () => useContext(GameContext);