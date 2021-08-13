import React, { useEffect, useContext } from 'react';
import moment from 'moment';
import { Popup } from 'semantic-ui-react';
import { Icon } from '@iconify/react-with-api';

import * as style from './todoItem.module.scss';
import { ToggleIsCompleteButton, TodoMenuButton } from '../../components/';
import { checkDateToDateFilter } from '../../util/helperFunctions';
import { GlobalContext } from '../../context/global';

const TodoItem = ({ todoItem }) => {
	useEffect(() => {
		document.getElementById(todoItem.id).style.backgroundColor = todoItem.color;
	});

	const { focusList, setFocusList } = useContext(GlobalContext);

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
				</div>
				<div className={style.Middle}>
					{checkDateToDateFilter('Past Due', todoItem.dueDate) && !todoItem.isComplete ? (
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
					<Popup
						content='Subtasks'
						trigger={
							<div className={style.SvgButton}>
								<Icon icon='bi:list-check' />
							</div>
						}
					/>
				</div>
				<div className={style.Right} onClick={focusRootList}>
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
