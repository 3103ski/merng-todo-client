import React, { useContext } from 'react';
import { Popup } from 'semantic-ui-react';

import * as style from './todoListFilter.module.scss';

import { GlobalContext } from '../../../context/global';

const TodoListButton = ({ list }) => {
	const { focusList, setFocusList, clearFocusList } = useContext(GlobalContext);
	return (
		<Popup
			content={
				!focusList
					? `Isolate ${list.title}`
					: focusList.value !== list.id
					? `Isolate ${list.title}`
					: `Remove Filter`
			}
			trigger={
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
					<p>{list.title}</p>
				</div>
			}
		/>
	);
};

export default TodoListButton;
