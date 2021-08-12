import React from 'react';
import { Modal, Button, Header } from 'semantic-ui-react';
import { Icon } from '@iconify/react-with-api';
import { useMutation } from '@apollo/client';

import { DELETE_TODO } from '../../../../graphql';

const DeleteTodoButton = ({ todoId, isDeleting, setIsDeleting }) => {
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
	);
};

export default DeleteTodoButton;
