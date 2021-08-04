import React, { useEffect } from 'react';

import * as style from './todoItem.module.scss';
import { ToggleIsCompleteButton, TodoMenuButton } from '..';

const TodoItem = ({ todoItem }) => {
	useEffect(() => {
		document.getElementById(todoItem.id).style.backgroundColor = todoItem.color;
	});

	return (
		<div className={`${style.OuterContainer} ${todoItem.isComplete && style.Complete}`}>
			<div className={style.LeftIconContainer}>
				<ToggleIsCompleteButton todo={todoItem} />
			</div>
			<div id={todoItem.id} className={style.MiddleIconContainer}>
				<div className={style.Left}>
					<p>{todoItem.title}</p>
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
