import React, { useContext } from 'react';
import { Icon } from '@iconify/react-with-api';
import { AuthContext } from '../../context/auth';

import * as style from './nacIvonButton.module.scss';

const NavIconButton = ({ callback, active, icon, expand, padLeft = false }) => {
	const { userSettings } = useContext(AuthContext);
	return (
		<div
			className={`${style.IconWrapper} noselect `}
			data-square-edges={userSettings.squareEdges ? 1 : 0}
			onClick={callback}
			data-space-right={padLeft ? 0 : 1}
			data-icon-expand={expand ? 1 : 0}
			data-icon-active={active ? 1 : 0}
			data-dark-icon={userSettings.darkMode ? 1 : 0}>
			<Icon icon={icon} />
		</div>
	);
};

export default NavIconButton;
