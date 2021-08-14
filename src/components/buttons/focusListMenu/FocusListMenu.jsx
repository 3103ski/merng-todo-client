import React, { useState, useContext } from 'react';
import * as style from './focusListMenu.module.scss';
import { Popup } from 'semantic-ui-react';

import { DeleteListComplete, DeleteList, EditList } from '../../../components/';
import { GlobalContext } from '../../../context/global';
import { AuthContext } from '../../../context/auth';

const FocusListMenu = () => {
	const [menuState, setMenuState] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [isDeletingCompletedTodos, setIsDeletingCompletedTodos] = useState(false);
	const [isDeletingList, setIsDeletingList] = useState(false);
	const { focusList } = useContext(GlobalContext);
	const { user } = useContext(AuthContext);
	const userId = user.id;

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
								setIsEditing(true);
							}}>
							Edit List
						</p>
						<p
							onClick={() => {
								setMenuState(false);
								setIsDeletingList(true);
							}}>
							Delete List
						</p>
					</div>
				}
			/>
			<DeleteListComplete
				isDeletingCompletedTodos={isDeletingCompletedTodos}
				setIsDeletingCompletedTodos={setIsDeletingCompletedTodos}
				setMenuState={setMenuState}
				list={focusList}
				userId={userId}
			/>
			<DeleteList
				setMenuState={setMenuState}
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
				setMenuState={setMenuState}
			/>
		</>
	);
};

export default FocusListMenu;
