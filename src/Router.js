import React from 'react';

import Game from './Game';
import Choices from './Choices';
import Settings from './Settings';

import { useRoutes } from './context/RouteStore';

const Router = () => {
	const [{ currentPage }, routerDispatch] = useRoutes();


	switch (currentPage) {
		case 'game':
			return <Game />
		case 'settings':
			return <Settings />
		case '':
		default:
			return <Choices />
		}

};

export default Router;