import React, { useEffect, useContext, useState } from 'react';
import { Popup } from 'semantic-ui-react';
import { Icon } from '@iconify/react-with-api';

import * as style from './todoItem.module.scss';
import { ToggleIsCompleteButton, TodoMenuButton, SubTaskInput } from '../../components/';
import ToggleMyDayButton from '../buttons/todoMenu/menuButtons/ToggleMyDay.jsx';
import { checkDateToDateFilter } from '../../util/helperFunctions';
import { GlobalContext } from '../../context/global';
import { AuthContext } from '../../context//auth';
import { AssignDueDate } from '../buttons/todoMenu//menuButtons/';

const TodoItem = ({ todoItem }) => {
	const { focusList, setFocusList } = useContext(GlobalContext);
	const { userSettings } = useContext(AuthContext);
	const [subTasksOpen, setSubTasksOpen] = useState(false);
	const [isSettingDate, setIsSettingDate] = useState(false);

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
						<p
							className={style.TodoTitle}
							data-dark-mode-text={userSettings.darkText ? 1 : 0}>
							{todoItem.title}
						</p>
					</div>
					<div className={style.IconContainer}>
						{!todoItem.isSubTask ? (
							<>
								<AssignDueDate
									setIsSettingDate={setIsSettingDate}
									isSettingDate={isSettingDate}
									todoId={todoItem.id}
									dueDate={todoItem.dueDate}
									setMenuState={() => console.log('blah')}
								/>
								<ToggleMyDayButton myDay={todoItem.myDay} todoId={todoItem.id} />
								<div
									className={style.SubTaskButton}
									onClick={() => setSubTasksOpen(!subTasksOpen)}>
									<Icon
										data-full-opacity={todoItem.subTasks.length > 0 ? 1 : 0}
										data-dark-mode-text={userSettings.darkText ? 1 : 0}
										icon='bi:list-check'
									/>
									{todoItem.subTasks.length > 0 ? (
										<p
											data-dark-mode-text={userSettings.darkText ? 1 : 0}
											style={{ marginRight: '10px' }}>
											{todoItem.subTasks.length}
										</p>
									) : null}
								</div>
							</>
						) : null}
					</div>
					{!todoItem.isSubTask ? (
						<div
							className={`${
								todoItem.isSubTask
									? null
									: userSettings.darkMode
									? style.DarkList
									: style.LightList
							} ${style.TodoItemList}`}
							data-is-sub-task={todoItem.isSubTask ? 1 : 0}
							onClick={focusRootList}>
							<p data-dark-mode-text={userSettings.darkText ? 1 : 0}>
								{todoItem.listTitle}
							</p>
							{checkDateToDateFilter('Past Due', todoItem.dueDate) &&
							!todoItem.isComplete ? (
								<Popup
									content='Past Due'
									trigger={
										<Icon
											data-dark-mode-text={userSettings.darkText ? 1 : 0}
											style={{ marginLeft: '10px' }}
											icon='ant-design:warning-filled'
										/>
									}
								/>
							) : null}
						</div>
					) : null}
				</div>
				<div className={style.TodoMenuContainer}>
					<TodoMenuButton isSettingDate={isSettingDate} todo={todoItem} />
				</div>
			</div>
			{subTasksOpen ? <SubTaskInput todoItem={todoItem} /> : null}
		</div>
	);
};

export default TodoItem;
