import React, { useContext, useState } from 'react';

// import { useQuery } from '@apollo/client';
// import { GET_USER_TODOS } from '../../../graphql/';

import * as style from './todoListFilter.module.scss';

import { GlobalContext } from '../../../context/global';
import { AuthContext } from '../../../context/auth';

const TodoListButton = ({ list }) => {
	const [todoCount, setTodoCount] = useState(0);
	const { focusList, setFocusList, clearFocusList } = useContext(GlobalContext);
	const { userSettings } = useContext(AuthContext);
	console.log(list);

	return (
		<div
			id={list.id}
			data-square-edges={userSettings.squareEdges ? 1 : 0}
			style={{ backgroundColor: list.color }}
			className={`${style.Container} noselect ${
				focusList && focusList.value !== list.id ? style.NotSelected : null
			} `}
			onClick={() => {
				if (focusList && focusList.value === list.id) {
					clearFocusList();
					setTodoCount(0);
				}
				if ((focusList && focusList.value !== list.id) || !focusList) {
					const fl = {
						value: list.id,
						color: list.color,
						title: list.title,
						id: list.id,
					};

					setFocusList(fl);
				}
			}}>
			<p className={style.ListTitle} data-dark-mode-text={userSettings.darkText ? 1 : 0}>
				{list.title}
			</p>
			<div
				className={style.TodoCountContainer}
				data-dark-mode={userSettings.darkMode ? 1 : 0}
				data-square-edges={userSettings.squareEdges ? 1 : 0}>
				<p className={style.TodoCount}>{todoCount}</p>
			</div>
		</div>
	);
};

export default TodoListButton;
