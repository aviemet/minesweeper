import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

import Timer from './Timer';

import { observer } from 'mobx-react-lite';
import { useGame } from '../context/GameStore';
import { useRoutes } from '../context/RouteStore';

const DisplayContainer = styled.div`
	background: #999;
	height: 35px;
`;

const Container = styled.div`
	display: inline-block;
	padding: 4px 4px 0 4px;
`;

const SmileyContainer = styled(Container)`
	button {
		width: 28px;
		height: 28px;
		margin: 0;
		padding: 2px;
		border-radius: 50%;
		border: solid 1px #999999;
		display: inline-block;
		text-decoration: none;
		background: #222222;
		color: #e0c632;
		font-family: sans-serif;
		font-size: 1rem;
		line-height: 1;
		cursor: pointer;
		text-align: center;
		transition: background 250ms ease-in-out, transform 150ms ease;
		appearance: none;

		&:hover {
			background: #AAAAAA;
		}
	}
`;

const FlagCounter = styled(Container)`
	float:left;

	color: ${({ theme }) => theme.flag.color }

	span {
		margin-left: 3px;
		color: #111;
	}
`;

const TimerContainer = styled(Container)`
	float:right;
`;

const Display = observer(() => {
	const game = useGame();
	const [{ difficulty }, routerDispatch] = useRoutes();

	const resetGame = () => {
		routerDispatch({
			type: 'navigate',
			page: '',
			difficulty
		});
	}

	return (
		<DisplayContainer>

			<FlagCounter>
				<Icon icon='flag' />
				<span>{game.mines - game.flags}</span>
			</FlagCounter>

			<SmileyContainer>
				<button onClick={ resetGame }>
					<Icon icon='smile' />
				</button>
			</SmileyContainer>

			<TimerContainer>
				<Timer />
			</TimerContainer>

		</DisplayContainer>
	)
});

export default Display;