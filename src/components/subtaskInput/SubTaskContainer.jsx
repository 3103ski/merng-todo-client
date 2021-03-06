import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import * as style from './subTaskContainer.module.scss';
import { ADD_TODO_TO_LIST } from '../../graphql/';
import { TodoItem } from '../../components/';

import { Icon } from '@iconify/react-with-api';

const SubTaskSection = ({ todoItem = {} }) => {
	const [textContent, setTextContent] = useState('');
	const borderColor = todoItem.color;
	const [inputActive, setInputActive] = useState(false);

	const [addSubTask] = useMutation(ADD_TODO_TO_LIST, {
		update(cache, { data: { addTodoListItem: newItem } }) {
			cache.modify({
				fields: {
					getUserTodos() {},
				},
			});

			setTextContent('');
			setInputActive(false);
		},
		variables: {
			title: textContent,
			listId: todoItem.id,
			masterId: todoItem.masterId,
			isSubTask: true,
		},
	});

	return (
		<div className={style.MainContainer} style={{ borderColor }}>
			<div className={style.SubTaskListContainer}>
				{!todoItem.subTasks
					? null
					: [...todoItem.subTasks]
							.sort((a, b) => a.isComplete - b.isComplete)
							.map((task) => {
								return <TodoItem key={task.id} todoItem={task} />;
							})}
			</div>

			<div className={style.InputContainer}>
				{!inputActive ? (
					<div onClick={() => setInputActive(true)} className={style.AddSubTaskButton}>
						<Icon icon='carbon:add' />
						<p>Add Sub Task</p>
					</div>
				) : (
					<>
						<div
							onClick={() => setInputActive(false)}
							className={style.CloseSubTaskButton}>
							<Icon icon='ci:off-close' />
						</div>
						<div className={style.InputWrapper} style={{ borderColor }}>
							<input
								style={{ innerWidth: '100%' }}
								value={textContent}
								placeholder='Enter Subtask'
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										addSubTask();
									}
								}}
								onChange={(e) => setTextContent(e.target.value)}
							/>
							<button onClick={addSubTask} style={{ backgroundColor: borderColor }}>
								<Icon icon='fluent:arrow-enter-up-24-regular' />
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default SubTaskSection;
