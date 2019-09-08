import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

import Timer from './Timer';

import { observer } from 'mobx-react-lite';
import { useGame } from '../context/GameStore';
import { useRoutes } from '../context/RouteStore';

import styled from 'styled-components';
import CounterContainer from '../components/CounterContainer';

const DisplayContainer = styled.div`
	background: #999;
	height: 35px;
	position: relative;
	border-radius: 5px 5px 0 0;
`;

const SmileyContainer = styled.div`
	display: inline-block;
	
	button {
		width: 30px;
		height: 30px;
		margin: 4px 0 0 0;
		padding: 1px 0 0 0;
		border-radius: 50%;
		border: solid 1px #999999;
		display: inline-block;
		text-decoration: none;
		background: #222222;
		color: #e0c632;
		font-family: sans-serif;
		font-size: 1.3rem;
		line-height: 1;
		cursor: pointer;
		text-align: center;
		transition: background 250ms ease-in-out, transform 150ms ease;
		appearance: none;
		outline: none;
		
		&:hover {
			background: #444444;
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
	
	const zeroPadded = num => {
		return num.toString().padStart(3, '0');
	};

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