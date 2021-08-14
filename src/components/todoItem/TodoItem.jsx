import React, { useEffect, useContext, useState } from 'react';
import moment from 'moment';
import { Popup } from 'semantic-ui-react';
import { Icon } from '@iconify/react-with-api';

import * as style from './todoItem.module.scss';
import { ToggleIsCompleteButton, TodoMenuButton, SubTaskInput } from '../../components/';
import { checkDateToDateFilter } from '../../util/helperFunctions';
import { GlobalContext } from '../../context/global';

const TodoItem = ({ todoItem }) => {
	const { focusList, setFocusList } = useContext(GlobalContext);
	const [subTasksOpen, setSubTasksOpen] = useState(false);

	let dueDate = '';
	if (todoItem.dueDate !== '') {
		dueDate = moment(new Date(todoItem.dueDate)).format('dddd MMM Do YYYY');
	}

	const focusRootList = () => {
		if (!focusList) {
			setFocusList({
				value: todoItem.listId,
				color: todoItem.color,
				title: todoItem.listTitle,
				id: todoItem.listId,
			});
		} else {
			setFocusList(null);
		}
	};

	useEffect(() => {
		document.getElementById(todoItem.id).style.backgroundColor = todoItem.color;
	});

	// useEffect(() => {
	// 	if (todoItem.subTasks && todoItem.subTasks.length > 0) {
	// 		setSubTasksOpen(true);
	// 	}
	// }, [todoItem]);

	return (
		<div
			className={`${style.OuterContainer} noselect ${todoItem.isComplete && style.Complete}`}>
			<div className={style.TodoItemContainer}>
				<div className={style.TodoCompleteToggleContainer}>
					<ToggleIsCompleteButton todo={todoItem} />
				</div>
				<div id={todoItem.id} className={style.TodoItemColorContainer}>
					<div className={style.TodoDetails}>
						<p className={style.TodoTitle}>{todoItem.title}</p>

						{todoItem.dueDate !== '' ? (
							<Popup
								content='Due Date'
								trigger={<p className={style.DueDate}>{dueDate}</p>}
							/>
						) : null}
					</div>
					<div className={style.IconContainer}>
						{checkDateToDateFilter('Past Due', todoItem.dueDate) &&
						!todoItem.isComplete ? (
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
						{!todoItem.isSubTask ? (
							<Popup
								content='Subtasks'
								trigger={
									<div
										className={style.SubTaskButton}
										onClick={() => setSubTasksOpen(!subTasksOpen)}>
										<Icon icon='bi:list-check' />
										{todoItem.subTasks.length > 0 ? (
											<p style={{ marginRight: '10px' }}>
												{todoItem.subTasks.length}
											</p>
										) : null}
									</div>
								}
							/>
						) : null}
					</div>
					{!todoItem.isSubTask ? (
						<div className={style.TodoItemList} onClick={focusRootList}>
							<p>{todoItem.listTitle}</p>
						</div>
					) : null}
				</div>
				<div className={style.TodoMenuContainer}>
					<TodoMenuButton todo={todoItem} />
				</div>
			</div>
			{subTasksOpen ? <SubTaskInput todoItem={todoItem} /> : null}
		</div>
	);
};

export default TodoItem;
