import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth';

const MainWrapper = ({ children }) => {
	const { userSettings } = useContext(AuthContext);
	console.log('these are active in wrapper :: ', userSettings);
	return (
		<div
			data-dark-mode={userSettings.darkMode ? 1 : 0}
			data-dark-mode-text={userSettings.darkText ? 1 : 0}>
			{children}
		</div>
	);
};

export default MainWrapper;
