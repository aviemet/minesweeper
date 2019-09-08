import { library } from '@fortawesome/fontawesome-svg-core';
import { faBomb, faFlag, faCogs, faSmile } from '@fortawesome/free-solid-svg-icons';

library.add(faBomb, faFlag, faCogs, faSmile);

export default {
	board: {
		background: 'rgba(255,255,255,0.75)',
		shadow: '0 0 10px #666',
		border: '#666666'
	},
	display: {
		background: '#999',
		height: 35,
		smiley: {
			size: 31,
			borderColor: '#999999',
			background: '#222222',
			backgroundHover: '#444444',
			color: '#E0C632'
		}
	},
	options: {
		background: '#333333',
		button: {
			background: '#CCCCCC',
			backgroundHover: '#AAAAAA',
			color: '#111111',
			borderColor: '#999999'
		}
	},
	cell: {
		height: 25,
		bgColorRevealed: '#333333',
		bgColorHidden: '#dedacc',
		bgColorHover: '#b5b3ae',
		border: {
			color: '#666666',
			size: 1
		},
		neighbors: {
			one: '#1976D2',
			two: '#419141',
			three: '#D32F2F',
			four: '#7B1FA2',
			five: '#ff8f00',
			six: '#0097A7',
			seven: '#111111',
			eight: '#999999',
		}
	},
	flag: {
		color: '#dc3636',
		correct: {
			color: '#222222',
			background: '#C2F7DA'
		}
	},
	mine: {
		color: '#580F0F',
		background: '#ea8239',
		exploded: {
			color: '#ea8239',
			background: '#DC3636'
		} 
	}
};