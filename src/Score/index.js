import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import styled from 'styled-components';
import ButtonLink from '../components/ButtonLink';

const ScoresContainer = styled.div`
	padding: 10px;
	border-radius: 10px;
	box-shadow: ${ ({theme}) => theme.board.shadow };
	background: ${ ({theme}) => theme.board.background };
`;

const Score = () => {
	const app = useApp();
	
	const [ scores, setScores ] = useState([]);

	// Wrapped in useEffect to facilitate unmounting of component
	useEffect(() => {
		app.getScores().then(results => setScores(results));
	}, []);

	return (
		<ScoresContainer>
			<header>
				<h1>
					Score Board
					<ButtonLink to='' style={ { float: 'left' } }>Go Back!</ButtonLink>
				</h1>
			</header>

			<table style={ { width: '100%' } }>
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