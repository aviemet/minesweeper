import React from 'react';
import Game from './Game';
import Choices from './Choices';

import { useRoutes } from './context/RouteStore';
import { useGame } from './context/GameStore';

const Router = () => {
	const game = useGame();
	const [{ currentPage }, routerDispatch] = useRoutes();


	switch (currentPage) {
		case 'game':
			return <Game />
		case '':
		default:

			game.newGame(8, 8, 10);

			routerDispatch({
				type: 'navigate',
				page: 'game'
			});
			return <Choices />
		}

};

export default Router;