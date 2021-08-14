import React, { useState, useContext } from 'react';
import * as style from './userMenu.module.scss';
import { Popup, Menu } from 'semantic-ui-react';

import { Icon } from '@iconify/react-with-api';

// import { CreateListModal } from '../../../components/';
import { GlobalContext } from '../../../context/global';

const UserMenu = () => {
	const [open, setOpen] = useState(false);
	const { setIsDeletingAllComplete, setIsCreatingNewList, clearFocusList } =
		useContext(GlobalContext);

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
					</div>
				}
			/>
		</Menu.Item>
	);
};

export default UserMenu;
