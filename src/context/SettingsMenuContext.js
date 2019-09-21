import React, { useContext, useState } from 'react';

export const SettingsMenuContext = React.createContext();

export const useSettingsMenu = () => useContext(SettingsMenuContext);

const SettingsMenuProvider = ({ children }) => {
	const [ visible, setVisible ] = useState(false);

	const settings = {
		visible,
		toggleVisible: () => setVisible(!visible)
	};

	return (
		<SettingsMenuContext.Provider value={ settings }>
			{ children }
		</SettingsMenuContext.Provider>
	);
};

export default SettingsMenuProvider;