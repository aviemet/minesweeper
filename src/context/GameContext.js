import React, { createContext, useContext } from 'react';
import MinesweeperGame from '../lib/Minesweeper';

const Game = new MinesweeperGame()

export const GameContext = createContext(Game);

export const GameProvider = ({children}) => (
	<GameContext.Provider value={Game}>
		{children}
	</GameContext.Provider>
);

export const useGame = () => useContext(GameContext);