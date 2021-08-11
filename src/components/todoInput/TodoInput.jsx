import React, { useEffect, useState } from 'react';
import { Input, Dropdown, Button, Form } from 'semantic-ui-react';
import { Icon } from '@iconify/react-with-api';

import * as style from './todoInput.module.scss';

import { useMutation, gql } from '@apollo/client';

import { ADD_TODO_TO_LIST } from '../../graphql/';

const TodoInput = ({ lists, isolatedList }) => {
	const [selectedList, setSelectedList] = useState(null);
	const [activeColor, setActiveColor] = useState('');

	const [todoText, setTodoText] = useState('');

	async function onChangeListSelector(e, option) {
		e.persist();
		const color = e.target.parentNode.getAttribute('color');
		setActiveColor(color);
		setSelectedList(option.value);
	}

	const listOptions = lists.map((l, i) => {
		return {
			key: i,
			value: l.id,
			color: l.color,
			text: (
				<p className={style.OptionText}>
					<span style={{ width: '20px', height: '20px' }}>
						<Icon icon='akar-icons:circle-fill' style={{ color: l.color }} />
					</span>
					{l.title}
				</p>
			),
		};
	});

	const [addToList] = useMutation(ADD_TODO_TO_LIST, {
		update(cache, { data: { addTodoListItem: newItem } }) {
			cache.modify({
				fields: {
					getUserTodos(existingTodos = []) {
						const newListRef = cache.writeFragment({
							data: newItem,
							fragment: gql`
								fragment NewTodo on Todo {
									id
									type
								}
							`,
						});
						return [...existingTodos, newListRef];
					},
				},
			});
			setTodoText('');
		},
		variables: {
			title: todoText,
			listId: selectedList,
		},
	});

	useEffect(() => {
		if (isolatedList) {
			setSelectedList(isolatedList.value);
			setActiveColor(isolatedList.color);
		}
		if (selectedList && !isolatedList && listOptions.length !== lists.length) {
			setSelectedList(listOptions[0].value);
			setActiveColor(listOptions[0].color);
		}
		if (selectedList === null && !isolatedList && listOptions.length > 0) {
			setSelectedList(listOptions[0].value);
			setActiveColor(listOptions[0].color);
		}
	}, [isolatedList, selectedList, listOptions, lists]);

	return (
		<div
			id='inputContainer'
			className={style.TodoInputContainer}
			style={{
				border: `5px solid `,
				borderColor: activeColor,
				backgroundColor: activeColor,
			}}>
			<Form onSubmit={addToList}>
				<Input
					placeholder='Add a todo'
					value={todoText}
					onChange={(e) => setTodoText(e.target.value)}
					className={style.TodoInput}
				/>
				<Button type='submit' className={style.TodoAddButton}>
					Add
				</Button>

				<Dropdown
					className={style.DropMenu}
					value={selectedList}
					upward
					options={listOptions}
					onChange={onChangeListSelector}
				/>
			</Form>
		</div>
	);
};

export default TodoInput;
