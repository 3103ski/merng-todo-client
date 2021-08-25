import React, { useState, useContext } from 'react';
import * as style from './focusListMenu.module.scss';
import { Popup } from 'semantic-ui-react';

import { DeleteListComplete, DeleteList, EditList, NavIconButton } from '../../../components/';
import { GlobalContext } from '../../../context/global';
import { AuthContext } from '../../../context/auth';

const FocusListMenu = () => {
	const [isEditing, setIsEditing] = useState(false);
	const [isDeletingList, setIsDeletingList] = useState(false);

	const { focusList, globalToggle, isDeletingFocusListComplete } = useContext(GlobalContext);
	const { user, userSettings } = useContext(AuthContext);

	const deleteListCompletedButton = (
		<NavIconButton
			active={isDeletingFocusListComplete}
			callback={() => {
				globalToggle({ isDeletingFocusListComplete: true });
			}}
			icon='carbon:clean'
		/>
	);

	const editListButton = (
		<NavIconButton
			icon='fluent:notepad-edit-16-filled'
			callback={() => {
				setIsEditing(true);
			}}
			active={isEditing}
		/>
	);

	const deleteListButton = (
		<NavIconButton
			icon='codicon:clear-all'
			callback={() => {
				setIsDeletingList(true);
			}}
			active={isDeletingList}
		/>
	);

	return (
		<>
			<div className={style.ListActionsMenu}>
				{userSettings.showPopups ? (
					<>
						<Popup
							content='Delete completed todos fo list that is currently in focus'
							trigger={deleteListCompletedButton}
						/>
						<Popup
							content='Edit the list currently in focus'
							trigger={editListButton}
						/>
						<Popup content='Delete list that is in focus' trigger={deleteListButton} />
					</>
				) : (
					<>
						{deleteListCompletedButton}
						{editListButton}
						{deleteListButton}
					</>
				)}
			</div>
			<DeleteListComplete list={focusList} />
			<DeleteList
				isDeletingList={isDeletingList}
				setIsDeletingList={setIsDeletingList}
				list={focusList}
				userId={user.id}
			/>
			<EditList
				list={focusList}
				userId={user.id}
				setIsEditing={setIsEditing}
				isEditing={isEditing}
			/>
		</>
	);
};

export default FocusListMenu;
