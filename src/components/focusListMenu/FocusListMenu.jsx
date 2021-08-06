import React, { useState } from 'react';
import * as style from './focusListMenu.module.scss';
import { Menu, Dropdown } from 'semantic-ui-react';
import { DeleteListComplete } from '../../modals/';

const FocusListMenu = ({ list, userId }) => {
	const [menuState, setMenuState] = useState(false);
	const options = [
		{
			key: 1,
			text: (
				// <p
				// 	onClick={() => {
				// 		setMenuState(!menuState);
				// 	}}>
				// 	Delete Completed Todos
				// </p>
				<DeleteListComplete list={list} userId={userId} />
			),
			value: 1,
		},
		{
			key: 2,
			text: (
				<p
					onClick={() => {
						setMenuState(!menuState);
					}}>
					Edit List
				</p>
			),
			value: 2,
		},
		{
			key: 3,
			text: (
				<p
					onClick={() => {
						setMenuState(!menuState);
					}}>
					Delete List
				</p>
			),
			value: 3,
		},
	];

	return (
		<Menu compact>
			<Dropdown
				simple
				item
				options={options}
				open={menuState}
				direction='left'
				className={style.FocusMenuButton}
				text={<p className={style.MenuButton}>Actions</p>}
			/>
		</Menu>
	);
};

export default FocusListMenu;
