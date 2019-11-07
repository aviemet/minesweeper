import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import styled from 'styled-components';
import ButtonLink from '../components/ButtonLink';
import ScoresTable from './ScoresTable';

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

			<Tabs>
				<Tab 
					className={ showDiff === 'medium' && 'active' }
					onClick={ () => setShowDiff('medium') }
				>Easy</Tab>
				<Tab 
					className={ showDiff === 'medium' && 'active' }
					onClick={ () => setShowDiff('medium') }
				>Medium</Tab>
				<Tab 
					className={ showDiff === 'hard' && 'active' }
					onClick={ () => setShowDiff('hard') }
				>Hard</Tab>
			</Tabs>
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

const Tabs = styled.div`
	text-align: left;
`;

const Tab = styled.div`
	border-radius: 10px 10px 0 0;
	border: 1px solid #111;
	border-bottom: none;
	display: inline-block;
	padding: 5px 10px;
	background: #CCC;
	cursor: pointer;

	&.active {
		background: #FFF;
	}
`;


export default Score;