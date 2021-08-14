import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import * as style from './userMenu.module.scss';
import { Popup, Menu } from 'semantic-ui-react';

import { Icon } from '@iconify/react-with-api';

import { GlobalContext } from '../../../context/global';
import { AuthContext } from '../../../context/auth';

const UserMenu = () => {
	const [open, setOpen] = useState(false);
	const { setIsDeletingAllComplete, setIsCreatingNewList, clearFocusList } =
		useContext(GlobalContext);

	const { logout } = useContext(AuthContext);

	return (
		<Menu.Item>
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
								setIsDeletingAllComplete(true);
								clearFocusList();
							}}>
							Delete All Completed Todos
						</p>
						<p
							onClick={() => {
								setOpen(false);
								setIsCreatingNewList(true);
								clearFocusList();
							}}>
							Create New List
						</p>
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
