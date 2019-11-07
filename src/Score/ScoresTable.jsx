import React from 'react'

const ScoresTable = ({ scores }) => {
	return (
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
						<td>{ new Date(score.createdAt).toLocaleDateString(navigator.language) }</td>
					</tr>
				) ) }
			</tbody>
		</table>
	)
}

export default ScoresTable;