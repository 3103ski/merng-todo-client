import React, { useState } from 'react';
import * as style from './focusListMenu.module.scss';
import { Popup } from 'semantic-ui-react';

import { DeleteListComplete, DeleteList, EditList } from '../../../modals';

const FocusListMenu = ({ list, userId }) => {
	const [menuState, setMenuState] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [isDeletingCompletedTodos, setIsDeletingCompletedTodos] = useState(false);
	const [isDeletingList, setIsDeletingList] = useState(false);

	return (
		<>
			<Popup
				trigger={
					<div className={style.ListActionMenuButton}>
						<p> List Actions</p>
					</div>
				}
				on='click'
				onOpen={() => setMenuState(true)}
				onClose={() => setMenuState(false)}
				open={menuState}
				content={
					<div className={style.ListActionsMenu}>
						<p
							onClick={() => {
								setMenuState(false);
								setIsDeletingCompletedTodos(true);
							}}>
							Delete Completed Todos
						</p>
						<p
							onClick={() => {
								setMenuState(false);
								setIsDeletingList(true);
							}}>
							Delete List
						</p>
						<p
							onClick={() => {
								setMenuState(false);
								setIsEditing(true);
							}}>
							Edit List
						</p>
					</div>
				}
			/>
			<DeleteListComplete
				isDeletingCompletedTodos={isDeletingCompletedTodos}
				setIsDeletingCompletedTodos={setIsDeletingCompletedTodos}
				setMenuState={setMenuState}
				list={list}
				userId={userId}
			/>
			<DeleteList
				setMenuState={setMenuState}
				isDeletingList={isDeletingList}
				setIsDeletingList={setIsDeletingList}
				list={list}
				userId={userId}
			/>
			<EditList
				list={list}
				userId={userId}
				setIsEditing={setIsEditing}
				isEditing={isEditing}
				setMenuState={setMenuState}
			/>
		</>
	);
};

export default FocusListMenu;
