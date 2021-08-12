import React, { useState } from 'react';

import { Popup } from 'semantic-ui-react';
import { Icon } from '@iconify/react-with-api';
import * as style from './todoMenu.module.scss';

import { DeleteTodo, ToggleMyDay, AssignDueDate } from './menuButtons';

const TodoMenu = ({ todo }) => {
	const [menuState, setMenuState] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [isSettingDate, setIsSettingDate] = useState(false);

	return (
		<>
			<Popup
				trigger={<Icon icon='bi:three-dots' />}
				flowing
				content={
					<div className={style.IconMenu}>
						<ToggleMyDay myDay={todo.myDay} todoId={todo.id} />
						<AssignDueDate
							todoId={todo.id}
							dueDate={todo.dueDate}
							setIsSettingDate={setIsSettingDate}
							isSettingDate={isSettingDate}
							setMenuState={setMenuState}
						/>
						<Icon
							icon='bi:trash-fill'
							onClick={() => {
								setMenuState(false);
								setIsDeleting(true);
							}}
						/>
					</div>
				}
				on='click'
				open={menuState}
				onClose={() => {
					if (!isSettingDate) {
						setMenuState(false);
					}
				}}
				onOpen={() => setMenuState(true)}
				className={style.TodoMenu}
			/>
			<DeleteTodo
				setMenuStateCallback={setMenuState}
				setIsDeleting={setIsDeleting}
				isDeleting={isDeleting}
				todoId={todo.id}
			/>
		</>
	);
};

export default TodoMenu;
