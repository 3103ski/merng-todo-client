import React, { useState, useEffect, useContext } from 'react';

import { Modal, Button, Form, Grid } from 'semantic-ui-react';
import { SliderPicker } from 'react-color';
import { useMutation, gql } from '@apollo/client';

import { GET_USER_TODOS } from '../../graphql';
import { GlobalContext } from '../../context/global';

import { randomHex } from '../../util/helperFunctions';
import * as style from './modals.module.scss';

const EditListModal = ({ list, setMenuState, setIsEditing, isEditing, userId }) => {
	const [color, setColor] = useState(list.color);
	const [title, setTitle] = useState(list.title);

	const { setFocusList } = useContext(GlobalContext);

	const [updateList] = useMutation(UPDATE_LIST_DETAILS, {
		async update(
			cache,
			{
				data: {
					updateTodoList: { title, id, color },
				},
			}
		) {
			cache
				.readQuery({
					query: GET_USER_TODOS,
					variables: {
						userId,
					},
				})
				.getUserTodos.map(async (todo) => {
					if (todo.listId === id) {
						let subTasks = [];
						if (todo.subTasks && todo.subTasks.length > 0) {
							subTasks = await todo.subTasks.map((task) => {
								return {
									...task,
									color,
									listTitle: title,
								};
							});
						}
						cache.writeQuery({
							query: gql`
								query WriteTodo($id: ID) {
									todo(id: $id) {
										id
										listTitle
										color
										subTasks {
											id
											listTitle
											color
										}
									}
								}
							`,
							data: {
								todo: {
									__typename: 'Todo',
									id: todo.id,
									color,
									listTitle: title,
									subTasks,
								},
							},
							variables: {
								id: todo.id,
							},
						});
						return null;
					}
					return null;
				});

			setFocusList({
				color,
				id,
				title,
				value: id,
			});
			return setIsEditing(false);
		},
		variables: {
			title,
			color,
			listId: list.id,
		},
	});

	useEffect(() => {
		setColor(list.color);
		setTitle(list.title);
		return () => {
			setColor(null);
			setTitle('');
		};
	}, [list, setMenuState]);

	return (
		<Modal
			size={'tiny'}
			onClose={() => {
				setIsEditing(false);
			}}
			onOpen={() => setIsEditing(true)}
			open={isEditing}>
			<Modal.Header style={{ color: 'white', backgroundColor: color }}>
				{title === '' ? 'Create List' : title}
			</Modal.Header>
			<Modal.Content>
				<Form>
					<Grid>
						<Grid.Row>
							<Grid.Column width={16}>
								<Form.Field>
									<Form.Input
										value={title}
										onChange={(e) => setTitle(e.target.value)}
										placeholder='Name your todo category'
									/>
									<SliderPicker
										color={color}
										onChange={(color) => {
											setColor(color.hex);
										}}
									/>
								</Form.Field>

								<div className={style.CreateListButtons}>
									<Button
										style={{ backgroundColor: color, color: 'white' }}
										onClick={() => setColor(randomHex())}>
										Random Color
									</Button>
									<Button
										color='green'
										onClick={() => {
											updateList();
										}}>
										Update
									</Button>
								</div>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Form>
			</Modal.Content>
		</Modal>
	);
};

const UPDATE_LIST_DETAILS = gql`
	mutation ($listId: ID!, $title: String, $color: String) {
		updateTodoList(listId: $listId, title: $title, color: $color) {
			title
			color
			id
		}
	}
`;

export default EditListModal;
