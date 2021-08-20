import React, { useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Icon } from '@iconify/react-with-api';
import { Button, Header, Modal } from 'semantic-ui-react';

import { AuthContext } from '../../context/auth';
import { GlobalContext } from '../../context/global';

const DeleteAllCompletedModal = () => {
	const { isDeletingAllComplete, globalToggle } = useContext(GlobalContext);
	const { user } = useContext(AuthContext);
	const userId = user.id;

	const [deleteCompleted] = useMutation(DELETE_ALL_COMPLETED, {
		update(cache, { data: { deleteAllCompletedTodos: ids } }) {
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
			userId: userId,
		},
	});

	return (
		<Modal
			basic
			onClose={() => globalToggle({ isDeletingAllComplete: false })}
			onOpen={() => globalToggle({ isDeletingAllComplete: true })}
			open={isDeletingAllComplete}
			size='small'>
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
				<Button
					basic
					color='red'
					inverted
					onClick={() => globalToggle({ isDeletingAllComplete: false })}>
					<Icon name='remove' /> No
				</Button>
				<Button
					color='green'
					inverted
					onClick={() => {
						deleteCompleted();
						globalToggle({ isDeletingAllComplete: false });
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
