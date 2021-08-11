import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Icon } from '@iconify/react-with-api';
import { Button, Header, Modal } from 'semantic-ui-react';

const DeleteListCompletedModal = ({
	isDeletingCompletedTodos,
	setIsDeletingCompletedTodos,
	list,
}) => {
	const [deleteCompleted] = useMutation(DELETE_LIST_COMPLETED, {
		update(cache, { data: { deleteListCompletedTodos: ids } }) {
			cache.modify({
				fields: {
					getUserTodos(existingTaskRefs, { readField }) {
						return existingTaskRefs.filter(
							(todo) => !ids.includes(readField('id', todo))
						);
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
			onClose={() => setIsDeletingCompletedTodos(false)}
			onOpen={() => setIsDeletingCompletedTodos(true)}
			open={isDeletingCompletedTodos}
			size='small'>
			<Header icon>
				<Icon name='archive' />
				Delete Completed Todos for "{list.title}"
			</Header>
			<Modal.Content>
				<p>You can not undo this action</p>
			</Modal.Content>
			<Modal.Actions>
				<Button
					basic
					color='red'
					inverted
					onClick={() => setIsDeletingCompletedTodos(false)}>
					<Icon name='remove' /> No
				</Button>
				<Button
					color='green'
					inverted
					onClick={() => {
						deleteCompleted();
						setIsDeletingCompletedTodos(false);
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
