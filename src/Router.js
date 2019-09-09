import React from 'react';

import { useGame } from './context/GameStore';
import Game from './Game';
import Settings from './Settings';

import { useRoutes } from './context/RouteStore';

const Router = () => {
	const [{ currentPage, difficulty }] = useRoutes();

	const game = useGame();

	switch (currentPage) {
		case 'settings':
			return <Settings />
		case '':
		default:
			game.newGame(difficulty);
			return <Game />
		}

};

export default Router;