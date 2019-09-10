import { library } from '@fortawesome/fontawesome-svg-core';
import { faBomb, faFlag, faCogs, faSmile, faSurprise, faGrinStars, faSadTear, faSortDown } from '@fortawesome/free-solid-svg-icons';

library.add( faBomb, faFlag, faCogs, faSmile, faSurprise, faGrinStars, faSadTear, faSortDown );

// Non-gray colors
const COLORS = {
	durianYellow: '#E1BD27',
	bone: '#E3DAC9',
	ecru: '#C2B280',
	cyan: '#1976D2',
	mint: '#419141',
	texasGreen:  '#059033',
	amarinthRed: '#D3212D',
	darkMagenta: '#7B1FA2',
	darkOrange: '#FF8F00',
	oceanBlue: '#0097A7',
	jasperRed: '#D73B3E'
};

export default {
	board: {
		background: 'rgba(255,255,255,0.75)',
		shadow: '0 0 10px #666',
		border: '#666666'
	},
	display: {
		background: '#999999',
		height: 35,
		smiley: {
			size: 31,
			borderColor: '#999999',
			background: '#222222',
			backgroundHover: '#444444',
			color: COLORS.durianYellow
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
		height: 30,
		bgColorRevealed: '#333333',
		bgColorHidden: COLORS.bone,
		bgColorHover: COLORS.ecru,
		border: {
			color: '#666666',
			size: 1
		},
		neighbors: {
			one: COLORS.cyan,
			two: COLORS.mint,
			three: COLORS.amarinthRed,
			four: COLORS.darkMagenta,
			five: COLORS.darkOrange,
			six: COLORS.oceanBlue,
			seven: '#111111',
			eight: '#999999',
		}
	},
	flag: {
		color: COLORS.jasperRed,
		correct: {
			color: COLORS.texasGreen,
			background: COLORS.bone
		}
	},
	mine: {
		color: '#580F0F',
		background: '#EA8239',
		exploded: {
			color: '#EA8239',
			background: '#DC3636'
		} 
	}
};