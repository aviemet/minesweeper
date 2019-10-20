import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { useDb } from '../context/DbContext';
import { useGame } from '../context/GameContext';
import useInterval from '../lib/useInterval';

import styled from 'styled-components';
import CounterContainer from '../components/CounterContainer';

const TimerContainer = styled(CounterContainer)`
	width: 29px;
`;

const Timer = observer(() => {
	const [ seconds, setSeconds ] = useState(0);
	const [ isCounting, setIsCounting ] = useState(false);
	
	const game = useGame();
	const mongoClient = useDb();

	useInterval(() => {
		setSeconds(seconds + 1);
	}, isCounting && seconds < 999 ? 1000 : null);

	useEffect(() => {
		if(!game.gameStarted) {
			setSeconds(0);
			setIsCounting(false);
		}

		if(game.gameOver) {
			setIsCounting(false);
		} else if(game.gameStarted) {
			setIsCounting(true);
		}

		if(game.winner === true && game.gameOver === false) {
			console.log(`You win! Score: ${seconds}`);
		}
	}, [game.gameOver, game.gameStarted, game.winner]);

	const zeroPadded = num => {
		return num.toString().padStart(3, '0');
	};

	return (
		<TimerContainer>
			<div>{zeroPadded(seconds)}</div>
		</TimerContainer>
	)
});

export default Timer;