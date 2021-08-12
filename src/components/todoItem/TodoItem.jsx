import React, { useEffect } from 'react';
import moment from 'moment';
import { Popup } from 'semantic-ui-react';
import { Icon } from '@iconify/react-with-api';

import * as style from './todoItem.module.scss';
import { ToggleIsCompleteButton, TodoMenuButton } from '../../components/';
import { checkDateToDateFilter } from '../../util/helperFunctions';

const TodoItem = ({ todoItem }) => {
	useEffect(() => {
		document.getElementById(todoItem.id).style.backgroundColor = todoItem.color;
	});

	let dueDate = '';
	if (todoItem.dueDate !== '') {
		dueDate = moment(new Date(todoItem.dueDate)).format('dddd MMM Do YYYY');
	}

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
						<Popup
							content='Due Date'
							trigger={<p className={style.DueDate}>{dueDate}</p>}
						/>
					) : null}
					{todoItem.myDay ? (
						<Popup
							content='Is My Day'
							trigger={
								<Icon
									style={{ marginLeft: '13px' }}
									icon='fluent:weather-partly-cloudy-day-24-filled'
								/>
							}
						/>
					) : null}
					{checkDateToDateFilter('Past Due', todoItem.dueDate) ? (
						<Popup
							content='Past Due'
							trigger={
								<Icon
									style={{ marginLeft: '10px' }}
									icon='ant-design:warning-filled'
								/>
							}
						/>
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
