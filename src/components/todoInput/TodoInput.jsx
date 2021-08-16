import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Input, Dropdown, Button, Form } from 'semantic-ui-react';
import { useMutation, gql } from '@apollo/client';
import { Icon } from '@iconify/react-with-api';

import * as style from './todoInput.module.scss';
import { ADD_TODO_TO_LIST } from '../../graphql/';
import { GlobalContext } from '../../context/global';
import { AuthContext } from '../../context/auth';

const TodoInput = ({ lists }) => {
	const [selectedList, setSelectedList] = useState(null);
	const [activeColor, setActiveColor] = useState('');
	const [todoText, setTodoText] = useState('');
	const { focusList } = useContext(GlobalContext);
	const { userSettings } = useContext(AuthContext);

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
			masterId: selectedList,
			isSubTask: false,
		},
	});

	const selectedListIsOption = useCallback(() => {
		return listOptions.filter((option) => option.value === selectedList).length > 0;
	}, [listOptions, selectedList]);

	useEffect(() => {
		if (focusList) {
			setSelectedList(focusList.value);
			setActiveColor(focusList.color);
		} else {
			if (
				(selectedList === null &&
					(listOptions.length > 0 || listOptions.length !== lists.length)) ||
				(selectedList && !selectedListIsOption())
			) {
				setSelectedList(listOptions[0].value);
				setActiveColor(listOptions[0].color);
			}
		}
	}, [focusList, selectedList, listOptions, lists, selectedListIsOption]);

	return (
		<div
			id='inputContainer'
			className={`${style.TodoInputContainer} ${
				userSettings.darkText ? 'inputDark' : 'inputLight'
			}`}
			style={{
				borderColor: activeColor,
				backgroundColor: activeColor,
			}}>
			<Form onSubmit={addToList} className={style.InputInner}>
				<div className={style.InputWrapper}>
					<Input
						placeholder='Add a todo'
						value={todoText}
						onChange={(e) => setTodoText(e.target.value)}
						className={style.TodoInput}
					/>
					<Button
						style={{ backgroundColor: activeColor }}
						type='submit'
						className={style.TodoAddButton}>
						<Icon
							data-dark-mode-text={userSettings.darkText ? 1 : 0}
							icon='fluent:arrow-enter-up-24-regular'
						/>
					</Button>
				</div>

				{!focusList ? (
					<Dropdown
						className={style.DropMenu}
						data-dark-mode-text={userSettings.darkText ? 1 : 0}
						value={selectedList}
						upward
						options={listOptions}
						onChange={onChangeListSelector}
					/>
				) : (
					<p className={style.DropMenuSubstituteText}>{focusList.title}</p>
				)}
			</Form>
		</div>
	);
};

export default TodoInput;
