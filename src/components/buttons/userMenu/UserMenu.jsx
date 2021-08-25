import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import * as style from './userMenu.module.scss';
import { Popup, Checkbox } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

import { UPDATE_USER_SETTINGS } from '../../../graphql';
import { NavIconButton } from '../../../components/';

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

	const [toggleShowPopups] = useMutation(UPDATE_USER_SETTINGS, {
		update(_, { data }) {
			console.log('sent', !userSettings.showPopups);
			console.log('popups toggled', data);
			updateSettings(data.updateSettings.userSettings);
		},
		variables: {
			...userSettings,
			showPopups: !userSettings.showPopups,
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
		<Popup
			open={open}
			onOpen={() => setOpen(true)}
			onClose={() => setOpen(false)}
			on={'click'}
			trigger={
				<NavIconButton
					paddLeft
					icon='ion:cog'
					active={open}
					callback={() => setOpen(!open)}
				/>
			}
			content={
				<div className={style.UserMenuContainer}>
					<p
						onClick={() => {
							setOpen(false);
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
					<div className={style.MenuToggle}>
						<p>Show Popups</p>
						<Checkbox
							checked={userSettings.showPopups}
							onChange={toggleShowPopups}
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
	);
};

export default UserMenu;
