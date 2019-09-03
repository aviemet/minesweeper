import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { faBomb, faFlag, faCogs } from '@fortawesome/free-solid-svg-icons';

library.add(faBomb, faFlag, faCogs);
const bomb = icon({ prefix: 'fa', iconName: 'bomb' });
const flag = icon({ prefix: 'fa', iconName: 'flag' });

console.log({ bomb })
console.log(bomb.icon[4])

export default {
	navbar: {
		height: '50px'
	},
	cell: {
		height: '25px'
	},
	icons: {
		bomb,
		flag
	}
};