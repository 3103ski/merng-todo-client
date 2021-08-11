import React, { useState, useEffect } from 'react';

import { Modal, Button, Form, Grid, Label } from 'semantic-ui-react';
import { SketchPicker } from 'react-color';
import { useMutation, gql } from '@apollo/client';

import { GET_USER_TODOS } from '../graphql';

const EditListModal = ({
	list,
	setMenuState,
	setIsEditing,
	isEditing,
	userId,
	setIsolatedList,
}) => {
	const [color, setColor] = useState(list.color);
	const [title, setTitle] = useState(list.title);

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
				.getUserTodos.map((todo) => {
					if (todo.listId === id) {
						cache.writeQuery({
							query: gql`
								query WriteTodo($id: ID) {
									todo(id: $id) {
										id
										listTitle
										color
									}
								}
							`,
							data: {
								todo: {
									__typename: 'Todo',
									id: todo.id,
									color,
									listTitle: title,
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

			setIsolatedList({
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
							<Grid.Column width={5}>
								<Form.Field>
									<SketchPicker
										color={color}
										onChange={(color) => {
											setColor(color.hex);
										}}
									/>
								</Form.Field>
							</Grid.Column>
							<Grid.Column width={11}>
								<Label.Detail style={{ marginBottom: '15px' }}>
									If you can't read the white text in the bar above, try picking a
									darker color.
								</Label.Detail>
								<Form.Field>
									<Form.Input
										value={title}
										onChange={(e) => setTitle(e.target.value)}
										placeholder='Name your todo category'
									/>
								</Form.Field>

								<Button
									color='green'
									onClick={() => {
										console.log('title :: ', title);
										console.log('color :: ', color);
										console.log('list id :: ', list.id);
										updateList();
									}}>
									Update
								</Button>
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
