import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../context/GameStore';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

const TimerContainer = styled.div`
	background: #999;
`;

const Timer = observer(() => {
	const seconds = useRef(0);
	const interval = useRef(setInterval(() => {
		seconds.current = seconds.current + 1;
	}));

	const game = useGame();

	useEffect(() => {
		if(game.gameOver === true) {
			clearInterval(interval.current);
		}
	}, []);

	return (
		<TimerContainer>
			<span>{seconds.current}</span>
		</TimerContainer>
	)
});

export default Timer;