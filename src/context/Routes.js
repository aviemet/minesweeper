import React, { createContext, useContext, useReducer } from 'react';

export const RouteContext = createContext();

export const RouteProvider = ({children }) => {
	const initialState = {
		currentPage: ''
	};

	const reducer = (state, action) => {
		switch (action.type) {
			case 'navigate':
				return {
					...state,
					currentPage: action.page
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