import React, { useState, useContext } from 'react';

import { Popup } from 'semantic-ui-react';
import { Icon } from '@iconify/react-with-api';
import * as style from './todoMenu.module.scss';

import { DeleteTodo } from './menuButtons';
import { AuthContext } from '../../../context/auth';

const TodoMenu = ({ todo, isSettingDate }) => {
	const [menuState, setMenuState] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const { userSettings } = useContext(AuthContext);

	return (
		<>
			<Popup
				trigger={
					<Icon data-dark-icon={userSettings.darkMode ? 1 : 0} icon='bi:three-dots' />
				}
				flowing
				content={
					<div className={style.IconMenu}>
						<Icon
							icon='bi:trash-fill'
							onClick={() => {
								// setMenuState(false);
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
