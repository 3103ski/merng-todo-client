import React, { useEffect } from 'react';
import moment from 'moment';

import * as style from './todoItem.module.scss';
import { ToggleIsCompleteButton, TodoMenuButton } from '../../components/';

const TodoItem = ({ todoItem }) => {
	useEffect(() => {
		document.getElementById(todoItem.id).style.backgroundColor = todoItem.color;
	});

	let dueDate = '';
	if (todoItem.dueDate !== '') {
		dueDate = moment(new Date(todoItem.dueDate)).format('MMM Do YYYY');
	}

	console.log('this item :: ', dueDate);

	return (
		<div
			className={`${style.OuterContainer} noselect ${todoItem.isComplete && style.Complete}`}>
			<div className={style.LeftIconContainer}>
				<ToggleIsCompleteButton todo={todoItem} />
			</div>
			<div id={todoItem.id} className={style.MiddleIconContainer}>
				<div className={style.Left}>
					<p className={style.TodoTitle}>{todoItem.title}</p>
					{todoItem.dueDate !== '' ? (
						<p className={style.DueDate}>Due : {dueDate}</p>
					) : null}
				</div>
				<div className={style.Right}>
					<p>{todoItem.listTitle}</p>
				</div>
			</div>
			<div className={style.RightIconContainer}>
				<TodoMenuButton todo={todoItem} />
			</div>
		</div>
	);
};

export default TodoItem;
