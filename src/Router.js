import React from 'react';
import Game from './Game';
import Choices from './Choices';

import { useRoutes } from './context/Routes';
import { useGame } from './context/GameStore';

const Router = () => {
	const [{ game }, gameDispatch] = useGame();
	const [{ currentPage }, routerDispatch] = useRoutes();


	switch (currentPage) {
		case 'game':
			return <Game />
		case '':
		default:

	gameDispatch({
		type: 'new',
		args: {width: 30, height: 16, mines: 40}
	});

	routerDispatch({
		type: 'navigate',
		page: 'game'
	});
			return <Choices />
	}

};

export default Router;