import React, { createContext, useContext, useReducer } from 'react';
import { useGame } from './GameContext';
import { useApp } from './AppContext';

export const RouteContext = createContext();

export const RouteProvider = ({children }) => {
	const game = useGame();
	const app = useApp();

	const initialState = {
		currentPage: window.location.hash.replace('#', '') || '',
		difficulty: JSON.parse(localStorage.getItem('difficulty')) || game.difficulty.EASY
	};

	const reducer = (state, action) => {
		// Save difficulty for seamless revisit
		if(action.difficulty) {
			localStorage.setItem('difficulty', JSON.stringify(action.difficulty));
		}

		switch (action.type) {
			case 'navigate':
				window.location.hash = `#${action.page}`;
				app.settingsMenuVisible = false;
				return {
					...state,
					currentPage: action.page,
					difficulty: action.difficulty || initialState.difficulty
				}
			default:
				return state;
		}
	}

	const [ route, routeDispatcher ] = useReducer(reducer, initialState);

	return(
		<RouteContext.Provider value={ { 
			route, 
			routeDispatcher 
		} }>
			{children}
		</RouteContext.Provider>
	);
};

export const useRoutes = () => useContext(RouteContext);