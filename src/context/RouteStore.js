import React, { createContext, useContext, useReducer } from 'react';
import { useGame } from './GameStore';

export const RouteContext = createContext();

export const RouteProvider = ({children }) => {
	const game = useGame();

	const initialState = {
		currentPage: '',
		difficulty: JSON.parse(localStorage.getItem('difficulty')) || game.difficulty.EASY
	};

	const reducer = (state, action) => {
		if(action.difficulty) {
			localStorage.setItem('difficulty', JSON.stringify(action.difficulty));
		}
		switch (action.type) {
			case 'navigate':
				return {
					...state,
					currentPage: action.page,
					difficulty: action.difficulty
				}
			default:
				return state;
		}
	}

	return(
		<RouteContext.Provider value={useReducer(reducer, initialState)}>
			{children}
		</RouteContext.Provider>
	);
};

export const useRoutes = () => useContext(RouteContext);