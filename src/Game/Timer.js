import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useGame } from '../context/GameStore';
import useInterval from '../lib/useInterval';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

const TimerContainer = styled.div`
	background: #999;
`;

const Timer = observer(() => {
	const [ seconds, setSeconds ] = useState(0);
	const [ isCounting, setIsCounting ] = useState(true);

	const game = useGame();

	useInterval(() => {
		setSeconds(seconds + 1);
		console.log({seconds});
	}, isCounting ? 1000 : null);

	useEffect(() => {
		if(game.gameOver) {
			setIsCounting(false);
		}
	}, [game.gameOver]);

	return (
		<TimerContainer>
			<div>{seconds}</div>
		</TimerContainer>
	)
});

export default Timer;