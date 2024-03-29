import React, { useEffect, useContext, useState } from 'react';
import { Popup } from 'semantic-ui-react';
import { Icon } from '@iconify/react-with-api';
import { useMutation } from '@apollo/client';

import * as style from './todoItem.module.scss';
import { ToggleIsCompleteButton, SubTaskInput } from '../../components/';
import ToggleMyDayButton from '../buttons/todoMenu/menuButtons/ToggleMyDay.jsx';
import DeleteTodo from '../buttons/todoMenu/menuButtons/DeleteTodo';
import { AssignDueDate } from '../buttons/todoMenu//menuButtons/';

import { checkDateToDateFilter } from '../../util/helperFunctions';
import { UPDATE_TODO_TITLE } from '../../graphql/';
import { GlobalContext } from '../../context/global';
import { AuthContext } from '../../context/auth';

const TodoItem = ({ todoItem }) => {
	const { focusList, setFocusList, expandAllSubTasks, todoDeleteOptionVisible } =
		useContext(GlobalContext);
	const { userSettings } = useContext(AuthContext);

	const [isDeleting, setIsDeleting] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [todoText, setTodoText] = useState(todoItem.title);
	const [isSettingDate, setIsSettingDate] = useState(false);
	const [globalSubTaskActive, setGlobalSubTaskActive] = useState(false);
	const [subTasksOpen, setSubTasksOpen] = useState(false);

	const [updateTitle] = useMutation(UPDATE_TODO_TITLE, {
		update(cache, { data }) {
			console.log(cache);
			console.log(data);
		},
		variables: {
			todoId: todoItem.id,
			title: todoText,
		},
	});

	const closeEditTitleHandler = () => {
		setIsEditing(false);
		if (todoText !== todoItem.title) {
			updateTitle();
		}
	};

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

	const listButton = (
		<div
			className={`${
				todoItem.isSubTask ? null : userSettings.darkMode ? style.DarkList : style.LightList
			} ${style.TodoItemList}`}
			data-is-sub-task={todoItem.isSubTask ? 1 : 0}
			onClick={focusRootList}>
			<p>{todoItem.listTitle}</p>
			{checkDateToDateFilter('Past Due', todoItem.dueDate) && !todoItem.isComplete ? (
				<Popup
					content='Past Due'
					trigger={
						<Icon style={{ marginLeft: '10px' }} icon='ant-design:warning-filled' />
					}
				/>
			) : null}
		</div>
	);

	// wrapping div for following buttons necessary to prevent semantic UI popup conflict
	const dueDateButton = (
		<div>
			<AssignDueDate
				setIsSettingDate={setIsSettingDate}
				isSettingDate={isSettingDate}
				todoId={todoItem.id}
				dueDate={todoItem.dueDate}
			/>
		</div>
	);

	const myDayButton = (
		<div>
			<ToggleMyDayButton myDay={todoItem.myDay} todoId={todoItem.id} />
		</div>
	);

	const subTaskButton = (
		<div className={style.SubTaskButton} onClick={() => setSubTasksOpen(!subTasksOpen)}>
			<Icon
				data-full-opacity={!todoItem.isSubTask ? (todoItem.subTasks.length > 0 ? 1 : 0) : 0}
				icon='bi:list-check'
			/>
			{todoItem.subTasks.length > 0 ? (
				<p style={{ marginRight: '10px' }}>
					{todoItem.subTasks.filter((task) => !task.isComplete).length}
				</p>
			) : null}
		</div>
	);

	document.addEventListener('click', async (e) => {
		const targetId = await e.target.id;
		const inputId = `todoInput_${todoItem.id}`;
		const todoTitleId = `todoText_${todoItem.id}`;
		if (isEditing === true && targetId !== inputId && targetId !== todoTitleId) {
			closeEditTitleHandler();
		}
	});

	useEffect(() => {
		document.getElementById(todoItem.id).style.backgroundColor = todoItem.color;
	});

	useEffect(() => {
		if (globalSubTaskActive !== expandAllSubTasks) {
			setGlobalSubTaskActive(expandAllSubTasks);
			if (subTasksOpen && globalSubTaskActive === false) {
				setSubTasksOpen(false);
			}
		}
	}, [globalSubTaskActive, expandAllSubTasks, subTasksOpen]);

	console.log('I am an item :: ', todoItem);

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
						<EditableText
							updateCallback={closeEditTitleHandler}
							todoId={todoItem.id}
							isEditing={isEditing}
							todoText={todoText}
							setTodoText={setTodoText}
							setIsEditing={setIsEditing}
							userSettings={userSettings}
						/>
					</div>
					<div className={style.IconContainer}>
						{!todoItem.isSubTask ? (
							<>
								{userSettings.showPopups ? (
									<>
										<Popup
											content={
												todoItem.dueDate === ''
													? 'Assign due date'
													: 'Change Due Date'
											}
											trigger={dueDateButton}
										/>
										<Popup
											content={
												todoItem.myDay
													? "Remove from 'My Day"
													: "Add to 'My Day'"
											}
											trigger={myDayButton}
										/>
										<Popup
											content={`${subTasksOpen ? 'Hide' : 'Show'} sub tasks`}
											trigger={subTaskButton}
										/>
									</>
								) : (
									<>
										{dueDateButton}
										{myDayButton}
										{subTaskButton}
									</>
								)}
							</>
						) : null}
					</div>
					{!todoItem.isSubTask ? (
						<>
							{userSettings.showPopups ? (
								<Popup
									content={`${
										focusList
											? `Remove ${todoItem.listTitle} Focus`
											: `Focus on ${todoItem.listTitle}`
									}`}
									trigger={listButton}
								/>
							) : (
								listButton
							)}
						</>
					) : null}
				</div>
			</div>
			{!todoItem.isSubTask ? (
				subTasksOpen || (globalSubTaskActive && todoItem.subTasks.length > 0) ? (
					<SubTaskInput todoItem={todoItem} />
				) : null
			) : null}
		</div>
	);
};

const EditableText = ({
	todoId,
	isEditing,
	todoText,
	setTodoText,
	setIsEditing,
	userSettings,
	updateCallback,
}) => {
	function focusInput() {
		const inputId = `todoInput_${todoId}`;
		const input = document.getElementById(inputId);
		return input.focus();
	}

	return (
		<div className={style.EditableTextContainer}>
			{isEditing ? (
				<input
					id={`todoInput_${todoId}`}
					type='text'
					value={todoText}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							setIsEditing(false);
							updateCallback();
						}
					}}
					onChange={(e) => setTodoText(e.target.value)}
				/>
			) : (
				<p
					onClick={async () => {
						await setIsEditing(true);
						return focusInput();
					}}
					id={`todoText_${todoId}`}
					className={style.TodoTitle}>
					{todoText}
				</p>
			)}

			{isEditing ? (
				<Icon
					icon='bi:check-circle'
					onClick={() => {
						setIsEditing(false);
						updateCallback();
					}}
				/>
			) : (
				<Icon
					icon='dashicons:edit'
					onClick={async () => {
						await setIsEditing(true);
						focusInput();
					}}
				/>
			)}
		</div>
	);
};

export default TodoItem;
