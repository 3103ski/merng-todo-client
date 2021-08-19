import React, { useEffect, useContext, useState } from 'react';
import { Popup } from 'semantic-ui-react';
import { Icon } from '@iconify/react-with-api';

import * as style from './todoItem.module.scss';
import { ToggleIsCompleteButton, SubTaskInput } from '../../components/';
import ToggleMyDayButton from '../buttons/todoMenu/menuButtons/ToggleMyDay.jsx';
import DeleteTodo from '../buttons/todoMenu/menuButtons/DeleteTodo';
import { checkDateToDateFilter } from '../../util/helperFunctions';
import { GlobalContext } from '../../context/global';
import { AuthContext } from '../../context//auth';
import { AssignDueDate } from '../buttons/todoMenu//menuButtons/';

const TodoItem = ({ todoItem }) => {
	const { focusList, setFocusList, expandAllSubTasks, todoDeleteOptionVisible } =
		useContext(GlobalContext);
	const { userSettings } = useContext(AuthContext);

	const [isDeleting, setIsDeleting] = useState(false);
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

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		if (
			subTasksOpen !== expandAllSubTasks &&
			!todoItem.isSubTask &&
			todoItem.subTasks.length > 0
		) {
			setSubTasksOpen(expandAllSubTasks);
		}
	});

	return (
		<div
			className={`${style.OuterContainer} noselect ${todoItem.isComplete && style.Complete}`}>
			<div className={style.TodoItemContainer}>
				<div className={style.LeftIconContainer}>
					<div
						data-is-deleting={todoDeleteOptionVisible ? 1 : 0}
						className={style.LeftIconContainerInner}>
						<div className={style.CompleteIcon}>
							<ToggleIsCompleteButton todo={todoItem} />
						</div>
						<div className={style.DeleteIcon}>
							<Icon
								onClick={() => setIsDeleting(true)}
								data-dark-icon={userSettings.darkMode ? 1 : 0}
								icon='mdi:delete-circle-outline'
							/>
							<DeleteTodo
								isDeleting={isDeleting}
								setIsDeleting={setIsDeleting}
								todoId={todoItem.id}
							/>
						</div>
					</div>
				</div>
				<div
					id={todoItem.id}
					data-square-edges={userSettings.squareEdges ? 1 : 0}
					className={style.TodoItemColorContainer}>
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
											{
												todoItem.subTasks.filter((task) => !task.isComplete)
													.length
											}
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
				{/* <div className={style.TodoMenuContainer}>
					<TodoMenuButton isSettingDate={isSettingDate} todo={todoItem} />
				</div> */}
			</div>
			{subTasksOpen ? <SubTaskInput todoItem={todoItem} /> : null}
		</div>
	);
};

export default TodoItem;
