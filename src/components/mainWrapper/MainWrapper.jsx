import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth';

const MainWrapper = ({ children }) => {
	const { userSettings } = useContext(AuthContext);
	return <div data-dark-mode={userSettings.darkMode ? 1 : 0}>{children}</div>;
};

export default MainWrapper;
