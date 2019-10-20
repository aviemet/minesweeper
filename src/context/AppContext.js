import React, { createContext, useContext } from 'react';
import AppStore from '../lib/AppStore';

const app = new AppStore();

const AppContext = createContext(app);

export const AppProvider = ({ children }) => (
	<AppContext.Provider value={ app }>
		{ children }
	</AppContext.Provider>
);

export const useApp = () => useContext(AppContext);