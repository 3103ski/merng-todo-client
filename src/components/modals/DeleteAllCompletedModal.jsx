import React, { useState, useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Icon } from '@iconify/react-with-api';
import { Button, Header, Modal, Popup } from 'semantic-ui-react';

import { AuthContext } from '../../context/auth';
import { GlobalContext } from '../../context/global';

const DeleteAllCompletedModal = ({ closeSettings = null }) => {
	const [open, setOpen] = useState(false);
	const { clearFocusList, isDeletingAllComplete, setIsDeletingAllComplete } =
		useContext(GlobalContext);
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
			onClose={() => setIsDeletingAllComplete(false)}
			onOpen={() => setIsDeletingAllComplete(true)}
			open={isDeletingAllComplete}
			size='small'
			// trigger={
			// 	<Popup
			// 		content='Delete ALL Completed Todos'
			// 		trigger={
			// 			<Icon
			// 				icon='ic:baseline-delete-sweep'
			// 				onClick={() => {
			// 					clearFocusList();
			// 					if (closeSettings) {
			// 						closeSettings();
			// 					}
			// 					return setIsDeletingAllComplete(true);
			// 				}}
			// 			/>
			// 		}
			// 	/>
			// }
		>
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
				<Button basic color='red' inverted onClick={() => setIsDeletingAllComplete(false)}>
					<Icon name='remove' /> No
				</Button>
				<Button
					color='green'
					inverted
					onClick={() => {
						deleteCompleted();
						setIsDeletingAllComplete(false);
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
