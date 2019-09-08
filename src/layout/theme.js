import { library } from '@fortawesome/fontawesome-svg-core';
import { faBomb, faFlag, faCogs, faSmile } from '@fortawesome/free-solid-svg-icons';

library.add(faBomb, faFlag, faCogs, faSmile);

export default {
	cell: {
		height: '25px',
		bgColorRevealed: '#333333',
		bgColorHidden: '#dedacc',
		bgColorHover: '#b5b3ae'
	},
	flag: {
		color: '#dc3636'
	}
};