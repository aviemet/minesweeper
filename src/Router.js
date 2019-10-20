import React from 'react';

import { useGame } from './context/GameContext';
import Game from './Game';
import Score from './Score';

import { useRoutes } from './context/RouteStore';

const Router = () => {
	const { route, routeDispatcher } = useRoutes();

	const game = useGame();

	// Detect hash change in address bar to facilitate component navigation
	window.onhashchange = () => {
		const page = window.location.hash.replace('#', '') || '';
		
		routeDispatcher({
			type: 'navigate',
			page: page,
		});
	};
	
	switch (route.currentPage) {
		case 'scores':
			return <Score />
		case '':
		default:
			game.newGame(route.difficulty);
			return <Game />
	}

};

export default Router;