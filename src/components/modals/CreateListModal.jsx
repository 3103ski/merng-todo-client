import React, { useState, useContext } from 'react';

import { Modal, Button, Form, Grid } from 'semantic-ui-react';
import { SliderPicker } from 'react-color';
import { useMutation, gql } from '@apollo/client';

import { CREATE_TODO_LIST } from '../../graphql/';
import { GlobalContext } from '../../context/global';

import * as style from './modals.module.scss';

const CreateListModal = ({ list = null }) => {
	const randomHex = () => `#${Math.floor(Math.random() * 17677215).toString(16)}`;
	const defaultColor = 'rgb(129, 129, 129)';

	const { isCreatingNewList, setIsCreatingNewList } = useContext(GlobalContext);

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
			return setIsCreatingNewList(false);
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
				setIsCreatingNewList(false);
				setColor(defaultColor);
				return setTitle('');
			}}
			size={'tiny'}
			onOpen={() => setIsCreatingNewList(true)}
			open={isCreatingNewList}>
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
										style={{
											backgroundColor: color,
											color: 'white',
										}}
										onClick={createList}>
										Create Category
									</Button>
								</div>
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
