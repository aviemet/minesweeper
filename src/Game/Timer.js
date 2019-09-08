import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameStore';
import useInterval from '../lib/useInterval';
import { observer } from 'mobx-react-lite';

import styled from 'styled-components';
import CounterContainer from '../components/CounterContainer';

const TimerContainer = styled(CounterContainer)`
	width: 29px;
`;

const Timer = observer(() => {
	const [ seconds, setSeconds ] = useState(0);
	const [ isCounting, setIsCounting ] = useState(false);
	
	const game = useGame();

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
		} else {
			setSeconds(0);
			if(game.gameStarted) {
				setIsCounting(true);
			}
		}
	}, [game.gameOver, game.gameStarted]);

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