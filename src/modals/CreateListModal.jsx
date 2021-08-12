import React, { useState } from 'react';

import { Modal, Button, Popup, Form, Grid, Label } from 'semantic-ui-react';
import { SketchPicker } from 'react-color';
import { useMutation, gql } from '@apollo/client';
import { Icon } from '@iconify/react-with-api';

import { CREATE_TODO_LIST } from '../graphql/';

const CreateListModal = ({ clearFocusList, list = null, trigger = null }) => {
	const defaultColor = '#4B6E90';

	const [open, setOpen] = useState(false);
	const [errors, setErrors] = useState({});

	const [color, setColor] = useState(list ? list.color : defaultColor);
	const [title, setTitle] = useState(list ? list.title : '');

	const [createList, { error }] = useMutation(CREATE_TODO_LIST, {
		update(cache, { data: { createTodoList: newList } }) {
			cache.modify({
				fields: {
					getUserLists(existingLists = []) {
						const newListRef = cache.writeFragment({
							data: newList,
							fragment: gql`
								fragment NewTodoList on TodoList {
									id
									type
								}
							`,
						});
						return [...existingLists, newListRef];
					},
				},
			});
			setColor(defaultColor);
			setTitle('');
			return setOpen(false);
		},
		onError(err) {
			console.log('Returned Errors', err.graphQLErrors[0].extensions.exception.errors);
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables: {
			color,
			title,
		},
	});

	return (
		<Modal
			onClose={() => {
				setOpen(false);
				setColor(defaultColor);
				return setTitle('');
			}}
			onOpen={() => setOpen(true)}
			open={open}
			trigger={
				<Popup
					trigger={
						trigger ? (
							<p
								onClick={() => {
									setOpen(true);
								}}>
								Edit List Details
							</p>
						) : (
							<Icon
								onClick={() => {
									clearFocusList();
									setOpen(true);
								}}
								icon='fluent:task-list-square-add-20-filled'
							/>
						)
					}
					content='Create New Todo List'
				/>
			}>
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

								<Button color='green' onClick={createList}>
									Create Category
								</Button>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Form>
				{Object.keys(errors).length > 0 && (
					<div className='ui error message'>
						<ul className='list'>
							{Object.values(errors).map((value) => (
								<li key={value}>{value}</li>
							))}
						</ul>
					</div>
				)}
				{error && (
					<div className='ui error message'>
						<ul className='list'>
							<li>{error}</li>
						</ul>
					</div>
				)}
			</Modal.Content>
		</Modal>
	);
};

export default CreateListModal;
