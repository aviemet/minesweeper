import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { faBomb, faFlag, faCogs } from '@fortawesome/free-solid-svg-icons';

library.add(faBomb, faFlag, faCogs);
const bomb = icon({ prefix: 'fa', iconName: 'bomb' });
const flag = icon({ prefix: 'fa', iconName: 'flag' });

export {
	bomb,
	flag
};