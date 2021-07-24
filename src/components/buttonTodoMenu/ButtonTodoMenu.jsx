import React, { useState } from 'react';

import { Popup, Modal, Header, Button } from 'semantic-ui-react';
import { Icon } from '@iconify/react-with-api';
import { useMutation } from '@apollo/client';

import { DELETE_TODO } from '../../graphql/';
import * as style from './buttonTodoMenu.module.scss';

const TodoMenu = ({ todoId }) => {
	const [menuState, setMenuState] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const [deleteTodo] = useMutation(DELETE_TODO, {
		update(cache, { data: { deleteTodo } }) {
			cache.modify({
				fields: {
					getUserTodos(existingTodos = []) {
						return existingTodos.filter((f) => f.__ref !== `Todo:${deleteTodo.id}`);
					},
				},
			});
		},
		variables: {
			todoId,
		},
	});

	return (
		<>
			<Popup
				trigger={<Icon icon='bi:three-dots' />}
				content={
					<div className={style.IconMenu}>
						<Icon icon='fluent:weather-partly-cloudy-day-24-regular' />
						<Icon icon='carbon:calendar-heat-map' />
						<Icon
							icon='bi:trash-fill'
							onClick={() => {
								setMenuState(false);
								setIsDeleting(true);
							}}
						/>
					</div>
				}
				on='click'
				open={menuState}
				onClose={() => setMenuState(false)}
				onOpen={() => setMenuState(true)}
				className={style.TodoMenu}
			/>
			<Modal
				basic
				onClose={() => setIsDeleting(false)}
				onOpen={() => setIsDeleting(true)}
				open={isDeleting}
				size='small'>
				<Header icon>
					<Icon name='archive' />
					DELETE TODO?
				</Header>
				<Modal.Content>
					<p>Deleting this will also remove all sub-todos and cannot be undone.</p>
				</Modal.Content>
				<Modal.Actions>
					<Button basic color='grey' inverted onClick={() => setIsDeleting(false)}>
						<Icon name='remove' /> No
					</Button>
					<Button
						color='red'
						inverted
						onClick={() => {
							deleteTodo();
							setIsDeleting(false);
						}}>
						<Icon name='checkmark' /> Yes
					</Button>
				</Modal.Actions>
			</Modal>
		</>
	);
};

export default TodoMenu;
