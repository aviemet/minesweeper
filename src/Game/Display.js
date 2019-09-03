import React from 'react';
import styled from 'styled-components';

import Timer from './Timer';

import { observer } from 'mobx-react-lite';
import { useGame } from '../context/GameStore';

const DisplayContainer = styled.div`
	background: #999;
`;

const Display = observer(() => {
	const game = useGame();

	console.log({ mines: game.mines, flags: game.flags });

	return (
		<DisplayContainer>
			<span>{game.mines - game.flags}</span>
			<Timer />
		</DisplayContainer>
	)
});

export default Display;