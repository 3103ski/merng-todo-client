import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import * as style from './subTaskContainer.module.scss';
import { ADD_TODO_TO_LIST, GET_USER_TODOS } from '../../graphql/';
import { TodoItem } from '../../components/';

import { Icon } from '@iconify/react-with-api';

const SubTaskSection = ({ todoItem = {} }) => {
	const [textContent, setTextContent] = useState('');
	const borderColor = todoItem.color;

	const [addSubTask] = useMutation(ADD_TODO_TO_LIST, {
		update(cache, { data: { addTodoListItem: newItem } }) {
			cache.modify({
				fields: {
					getUserTodos() {},
				},
			});

			setTextContent('');
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
			{todoItem.subTasks.map((task) => {
				console.log('this sub todo :: ', task.id);
				return <TodoItem key={task.id} todoItem={task} />;
			})}
			<div className={style.InputContainer}>
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
			</div>
		</div>
	);
};

export default SubTaskSection;

// 	if (todo.id === newItem.listId) {
// 		cache.writeQuery({
// 			query: gql`
// 				query WriteTodo($id: ID) {
// 					todo(id: $id) {
// 						id
// 						subTasks
// 					}
// 				}
// 			`,
// 			data: {
// 				todo: {
// 					__typename: 'Todo',
// 					id: todo.id,
// 					subTasks: [...todo.subTasks, newItem],
// 				},
// 			},
// 			variables: {
// 				id: todo.id,
// 			},
// 		});
// 	}
// 	return null;
// });
