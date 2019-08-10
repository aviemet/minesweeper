import React, { useContext } from 'react';
import { observable } from 'mobx';

class GameStore {
	@observable board = [];
}

const GameStoreContext = React.createContext(new GameStore());

const useGameStore = useContext(GameStoreContext);

export default GameStore;

export {
	GameStoreContext,
	useGameStore
};