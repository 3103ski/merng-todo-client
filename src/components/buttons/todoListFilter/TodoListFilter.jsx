import React, { useContext } from 'react';

import * as style from './todoListFilter.module.scss';

import { GlobalContext } from '../../../context/global';
import { AuthContext } from '../../../context/auth';

const TodoListButton = ({ list }) => {
	const { focusList, setFocusList, clearFocusList } = useContext(GlobalContext);
	const { userSettings } = useContext(AuthContext);
	return (
		<div
			id={list.id}
			style={{ backgroundColor: list.color }}
			className={`${style.Container} noselect ${
				focusList && focusList.value !== list.id ? style.NotSelected : null
			} `}
			onClick={() => {
				if (focusList && focusList.value === list.id) {
					clearFocusList();
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
			<p data-dark-text={userSettings.darkText ? 1 : 0}>{list.title}</p>
		</div>
	);
};

export default TodoListButton;
