import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Icon } from '@iconify/react-with-api';
import { Button, Header, Modal, Popup } from 'semantic-ui-react';
import { GET_USER_TODOS } from '../graphql';

const DeleteListCompletedModal = ({ userId, list }) => {
	const [open, setOpen] = useState(false);
	console.log('My list has an id ?? :: ', list);

	const [deleteCompleted] = useMutation(DELETE_LIST_COMPLETED, {
		update(cache, { data: { deleteListCompletedTodos: ids } }) {
			const existingTodos = cache.readQuery({
				query: GET_USER_TODOS,
				variables: {
					userId,
				},
			}).getUserTodos;

			console.log('existing todos??', existingTodos);
			// console.log('data??', ids);

			const updatedTodos = existingTodos.filter((todo) => !ids.includes(todo.id));

			cache.modify({
				fields: {
					getUserTodos() {
						return updatedTodos;
					},
				},
			});
		},
		variables: {
			listId: list.id,
		},
	});

	return (
		<Modal
			basic
			onClose={() => setOpen(false)}
			onOpen={() => setOpen(true)}
			open={open}
			size='small'
			trigger={<p>Delete Completed Todos</p>}>
			<Header icon>
				<Icon name='archive' />
				Delete Completed Todos for "{list.title}"
			</Header>
			<Modal.Content>
				<p>You can not undo this action</p>
			</Modal.Content>
			<Modal.Actions>
				<Button basic color='red' inverted onClick={() => setOpen(false)}>
					<Icon name='remove' /> No
				</Button>
				<Button
					color='green'
					inverted
					onClick={() => {
						deleteCompleted();
						setOpen(false);
					}}>
					<Icon name='checkmark' /> Yes
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

const DELETE_LIST_COMPLETED = gql`
	mutation deleteListCompletedTodos($listId: ID) {
		deleteListCompletedTodos(listId: $listId)
	}
`;

export default DeleteListCompletedModal;
