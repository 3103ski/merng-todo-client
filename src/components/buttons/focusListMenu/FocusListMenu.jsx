import React, { useState, useContext } from 'react';
import * as style from './focusListMenu.module.scss';
import { Popup } from 'semantic-ui-react';
import { Icon } from '@iconify/react-with-api';

import { DeleteListComplete, DeleteList, EditList } from '../../../components/';
import { GlobalContext } from '../../../context/global';
import { AuthContext } from '../../../context/auth';

const FocusListMenu = () => {
	const [isEditing, setIsEditing] = useState(false);
	const [isDeletingCompletedTodos, setIsDeletingCompletedTodos] = useState(false);
	const [isDeletingList, setIsDeletingList] = useState(false);

	const { focusList, globalToggle } = useContext(GlobalContext);
	const { user, userSettings } = useContext(AuthContext);

	const userId = user.id;

	return (
		<>
			<div className={style.ListActionsMenu}>
				<Popup
					content='Delete Completed Todos'
					trigger={
						<Icon
							data-dark-icon={userSettings.darkMode ? 1 : 0}
							onClick={() => {
								globalToggle({ isDeletingFocusListComplete: true });
							}}
							icon='carbon:clean'
						/>
					}
				/>
				<Popup
					content='Edit List'
					trigger={
						<Icon
							data-dark-icon={userSettings.darkMode ? 1 : 0}
							onClick={() => {
								setIsEditing(true);
							}}
							icon='fluent:notepad-edit-16-filled'
						/>
					}
				/>
				<Popup
					content='Delete List'
					trigger={
						<Icon
							data-dark-icon={userSettings.darkMode ? 1 : 0}
							onClick={() => {
								setIsDeletingList(true);
							}}
							icon='codicon:clear-all'
						/>
					}
				/>
			</div>
			<DeleteListComplete
				isDeletingCompletedTodos={isDeletingCompletedTodos}
				setIsDeletingCompletedTodos={setIsDeletingCompletedTodos}
				list={focusList}
				userId={userId}
			/>
			<DeleteList
				isDeletingList={isDeletingList}
				setIsDeletingList={setIsDeletingList}
				list={focusList}
				userId={userId}
			/>
			<EditList
				list={focusList}
				userId={userId}
				setIsEditing={setIsEditing}
				isEditing={isEditing}
			/>
		</>
	);
};

export default FocusListMenu;
