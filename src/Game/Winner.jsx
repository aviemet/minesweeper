import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useGame } from '../context/GameContext';

import styled from 'styled-components';
import { observer } from 'mobx-react-lite';

const PageDimmer = styled.div`
	width: 100vw;
	height: 100vh;
	position: absolute;
	top: 0;
	left: 0;
	margin: 0;
	padding: 0;
	z-index: 1000;
	display: none;
	
	&.visible {
		display: block;
	}
`;

const Modal = styled.div`
	position: absolute;
	top: 40%;
	left: 50%;
	transform: translate(-50%, -50%);
	max-width: 80%;
	max-height: 80%;
	overflow-x: hidden;
	overflow-y: auto;

	padding: 10px;
	border-radius: 10px;
	box-shadow: ${ ({theme}) => theme.board.shadow };
	background: ${ ({theme}) => theme.board.background };

	button.green {
		background: ${({ theme }) => theme.colors.mint };
	}
`;

const InnerContainer = styled.div`
	position: relative;
	display: inline-block;
	padding: 10px;
	background: ${({ theme }) => theme.display.background };
`;

const Actions = styled.div`
	text-align: right;
`;

const Winner = observer(() => {
	const app = useApp();
	const game = useGame();

	const [ nameInputValue, setNameInputValue ] = useState('');

	const closeModal = () => app.toggleWinnerDialog(false);

	const saveScore = () => {
		app.saveScore({
			name: nameInputValue,
			score: game.seconds,
			difficulty: game.getDifficulty()
		}).then(closeModal());
	}

	return (
		<PageDimmer className={ app.showWinnerDialog && 'visible'}>
			<Modal>
				<InnerContainer>

					<h1>You Won!</h1>
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th>Difficulty</th>
								<th>Score</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><input 
									type='text' 
									value={ nameInputValue }
									onChange={ e => setNameInputValue(e.currentTarget.value) }
								/></td>
								<td>{ game.getDifficulty() }</td>
								<td>{ game.seconds }</td>
							</tr>
						</tbody>
					</table>

					<Actions>
						<button onClick={ closeModal }>Don't Save</button>
						<button className='green' onClick={ saveScore }>Save Score</button>
					</Actions>
					
				</InnerContainer>
			</Modal>
		</PageDimmer>
	);
});

export default Winner;