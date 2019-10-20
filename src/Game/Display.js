import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

import Timer from './Timer';

import { observer } from 'mobx-react-lite';
import { useGame } from '../context/GameContext';
import { useRoutes } from '../context/RouteStore';

import styled from 'styled-components';
import CounterContainer from '../components/CounterContainer';

const DisplayContainer = styled.div`
	background: ${({ theme }) => theme.display.background };
	height: ${({ theme }) => theme.display.height }px;
	position: relative;
	border-radius: 5px 5px 0 0;
`;

const SmileyContainer = styled.div`
	display: inline-block;
	
	button {
		width: ${({ theme }) => theme.display.smiley.size }px;
		height: ${({ theme }) => theme.display.smiley.size }px;
		margin: 3px 0 0 0;
		padding: 1px 0 0 0;
		border-radius: 50%;
		border: solid 1px ${({ theme }) => theme.display.smiley.borderColor };
		background: ${({ theme }) => theme.display.smiley.background };
		color: ${({ theme }) => theme.display.smiley.color };
		display: inline-block;
		text-decoration: none;
		font-size: ${({ theme }) => parseInt(theme.display.smiley.size * 0.75) }px;
		line-height: 1;
		cursor: pointer;
		text-align: center;
		transition: background 250ms ease-in-out, transform 150ms ease;
		appearance: none;
		outline: none;

		&:hover {
			background: ${({ theme }) => theme.display.smiley.backgroundHover };
		}
	}
`;

const FlagCounterContainer = styled.div`
	float:left;
	padding: 5px 0 0 5px;
	display: inline-block;
`;

const FlagCounter = styled(CounterContainer)`

	color: ${({ theme }) => theme.flag.color };

	span {
		margin-left: 3px;
	}
`;

const TimerContainer = styled.div`
	float:right;
	padding: 5px 5px 0 0;
	display: inline-block;
`;

const ICONS = {
	NORMAL: 'smile',
	CLICKED: 'surprise',
	WON: 'grin-stars',
	LOST: 'sad-tear'
};

const Display = observer(() => {
	const game = useGame();
	const { route, routeDispatcher } = useRoutes();
	const [ faceIcon, setFaceIcon ] = useState(ICONS.NORMAL);

	const resetGame = () => {
		routeDispatcher({
			type: 'navigate',
			page: '',
			difficulty: route.difficulty
		});
	}
	
	const zeroPadded = num => {
		return num.toString().padStart(3, '0');
	};

	useEffect(() => {
		let face = ICONS.NORMAL;

		if(game.gameOver) {
			face = game.winner ? ICONS.WON : ICONS.LOST;
		} else if(game.clicks.size > 0) {
			face = ICONS.CLICKED;
		}

		setFaceIcon(face);
	}, [game.clicks.size, game.gameOver, game.winner]);

	return (
		<DisplayContainer>

			<FlagCounterContainer>
				<FlagCounter>
					<Icon icon='flag' />
					<span>{ zeroPadded(game.mines - game.flags) }</span>
				</FlagCounter>
			</FlagCounterContainer>

			<SmileyContainer>
				<button onClick={ resetGame }>
					<Icon icon={faceIcon} />
				</button>
			</SmileyContainer>

			<TimerContainer>
				<Timer />
			</TimerContainer>

		</DisplayContainer>
	)
});

export default Display;