import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Icon } from '@iconify/react-with-api';
import { Button, Header, Modal, Popup } from 'semantic-ui-react';
import { GET_USER_TODOS } from '../graphql';

const DeleteAllCompletedModal = ({ clearIsolatedList, userId }) => {
	const [open, setOpen] = useState(false);

	const [deleteCompleted] = useMutation(DELETE_ALL_COMPLETED, {
		update(cache, { data: { deleteAllCompletedTodos: ids } }) {
			const existingTodos = cache.readQuery({
				query: GET_USER_TODOS,
				variables: {
					userId,
				},
			}).getUserTodos;

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
			userId: userId,
		},
	});

	return (
		<Modal
			basic
			onClose={() => setOpen(false)}
			onOpen={() => setOpen(true)}
			open={open}
			size='small'
			trigger={
				<Popup
					content='Delete ALL Completed Todos'
					trigger={
						<Icon
							icon='ic:baseline-delete-sweep'
							onClick={() => {
								clearIsolatedList();
								return setOpen(true);
							}}
						/>
					}
				/>
			}>
			<Header icon>
				<Icon name='archive' />
				Delete ALL Completed Todo Items
			</Header>
			<Modal.Content>
				<p>
					Are you sure you want to delete ALL completed todos for ALL todo lists? You
					cannot undo this.
				</p>
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

const DELETE_ALL_COMPLETED = gql`
	mutation deleteAllCompletedTodos($userId: ID) {
		deleteAllCompletedTodos(userId: $userId)
	}
`;

export default DeleteAllCompletedModal;
