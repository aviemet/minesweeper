import React from 'react';

import { useGame } from './context/GameStore';
import Game from './Game';
import Score from './Score';

import { useRoutes } from './context/RouteStore';

const Router = () => {
	const [{ currentPage, difficulty }] = useRoutes();

	const game = useGame();
console.log({ currentPage });
	switch (currentPage) {
		case 'scores':
			return <Score />
		case '':
		default:
			game.newGame(difficulty);
			return <Game />
		}

};

export default Router;