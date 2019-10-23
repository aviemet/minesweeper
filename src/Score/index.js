import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import styled from 'styled-components';
import { useRoutes } from '../context/RouteStore';

const ScoresContainer = styled.div`
	padding: 10px;
	border-radius: 10px;
	box-shadow: ${ ({theme}) => theme.board.shadow };
	background: ${ ({theme}) => theme.board.background };
`;

const Score = () => {
	const app = useApp();
	const { routeDispatcher } = useRoutes();

	const [ scores, setScores ] = useState([]);
	useEffect(() => {
		app.getScores().then(results => setScores(results));
	}, []);

	const goBack = () => {
		routeDispatcher({
			type: 'navigate',
			page: '',
		});
	};

	return (
		<ScoresContainer>
			<header>
				<h1>Score Board</h1>
				<a onClick={ goBack }>Go Back</a>
			</header>

			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Score</th>
						<th>Difficulty</th>
						<th>Date</th>
					</tr>
				</thead>
				<tbody>					
					{ scores.map((score, i) => (
						<tr key={ i }>
							<td>{ score.name }</td>
							<td>{ score.score }</td>
							<td>{ score.difficulty }</td>
							<td>{ new Date(score.createdAt).toString() }</td>
						</tr>
					) ) }
				</tbody>
			</table>
		</ScoresContainer>
	);
};

export default Score;