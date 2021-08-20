import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import * as style from './userMenu.module.scss';
import { Popup, Menu, Checkbox } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

import { Icon } from '@iconify/react-with-api';
import { UPDATE_USER_SETTINGS } from '../../../graphql';

import { GlobalContext } from '../../../context/global';
import { AuthContext } from '../../../context/auth';

const UserMenu = () => {
	const [open, setOpen] = useState(false);
	const { setFocusList, globalToggle } = useContext(GlobalContext);

	const { logout, userSettings, updateSettings } = useContext(AuthContext);

	const [toggleDarkMode] = useMutation(UPDATE_USER_SETTINGS, {
		update(_, { data }) {
			updateSettings(data.updateSettings.userSettings);
		},
		variables: {
			...userSettings,
			darkMode: !userSettings.darkMode,
		},
	});

	const [toggleSquareEdges] = useMutation(UPDATE_USER_SETTINGS, {
		update(_, { data }) {
			updateSettings(data.updateSettings.userSettings);
		},
		variables: {
			...userSettings,
			squareEdges: !userSettings.squareEdges,
		},
	});

	return (
		<Menu.Item data-dark-icon={userSettings.darkMode ? 1 : 0}>
			<Popup
				open={open}
				onOpen={() => setOpen(true)}
				onClose={() => setOpen(false)}
				on={'click'}
				trigger={
					<div className={style.UserMenuIcon}>
						<Icon icon='ion:cog' />
					</div>
				}
				content={
					<div className={style.UserMenuContainer}>
						<p
							onClick={() => {
								setOpen(false);
								// setIsDeletingAllComplete(true);
								globalToggle({ isDeletingAllComplete: true });
								setFocusList(null);
							}}>
							Delete All Completed Todos
						</p>
						<div className={style.MenuDivider} />
						<p className={style.MenuLabel}>Style</p>
						<div className={style.MenuToggle}>
							<p>Dark Mode</p>
							<Checkbox
								checked={userSettings.darkMode}
								onChange={toggleDarkMode}
								toggle
							/>
						</div>
						<div className={style.MenuToggle}>
							<p>Box Mode</p>
							<Checkbox
								checked={userSettings.squareEdges}
								onChange={toggleSquareEdges}
								toggle
							/>
						</div>
						<div className={style.MenuDivider} />
						<NavLink to='/login' onClick={logout}>
							Logout
						</NavLink>
					</div>
				}
			/>
		</Menu.Item>
	);
};

export default UserMenu;
