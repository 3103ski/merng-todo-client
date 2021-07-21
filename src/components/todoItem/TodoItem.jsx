import React, { useEffect } from 'react';

import { Icon } from '@iconify/react-with-api';

import * as style from './todoItem.module.scss';
import { ToggleIsCompleteButton } from '../../components/';

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
				<Icon icon='bi:three-dots' />
			</div>
		</div>
	);
};

export default TodoItem;
