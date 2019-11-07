import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import styled from 'styled-components';
import ButtonLink from '../components/ButtonLink';
import ScoresTable from './ScoresTable';
import Tabs from './Tabs';

const Score = () => {
	const app = useApp();
	
	const [ scores, setScores ] = useState([]);
	const [ showDiff, setShowDiff ] = useState('easy');

	const fetchScores = (difficulty) => {
		setScores([]);
		app.getScores(difficulty).then(results => setScores(results));
	}

	// Wrapped in useEffect to facilitate unmounting of component
	useEffect(() => {
		fetchScores(showDiff);
	}, [showDiff]);

	return (
		<ScoresContainer>
			<header>
				<h1>
					Score Board
					<ButtonLink to='' style={ { float: 'left' } }>Go Back!</ButtonLink>
				</h1>
			</header>

			<Tabs 
				active={ showDiff } 
				action={ setShowDiff }
				tabs={ ['Easy', 'Medium', 'Hard'] }
			/>
			<Section>
				<ScoresTable scores={ scores } />
			</Section>
		</ScoresContainer>
	);
};

const ScoresContainer = styled.div`
	padding: 10px;
	border-radius: 10px;
	box-shadow: ${ ({theme}) => theme.board.shadow };
	background: ${ ({theme}) => theme.board.background };
	height: 60%;
`;

const Section = styled.div`
	background: #FFF;
	border-radius: 0 0 10px 10px;
	padding: 10px;
	min-height: 75%;
	overflow-y: auto;
`;

export default Score;