import React, { useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Icon } from '@iconify/react-with-api';
import { Button, Header, Modal } from 'semantic-ui-react';

import { GlobalContext } from '../../context/global';

const DeleteList = ({ list, setIsDeletingList, isDeletingList }) => {
	const { clearFocusList } = useContext(GlobalContext);
	const [deleteList] = useMutation(DELETE_LIST, {
		update(cache, { data }) {
			cache.modify({
				fields: {
					getUserTodos(existingTaskRefs, { readField }) {
						return existingTaskRefs.filter(
							(todo) => list.id !== readField('listId', todo)
						);
					},
					getUserLists(existingTaskRefs, { readField }) {
						return existingTaskRefs.filter(
							(todoList) => list.id !== readField('id', todoList)
						);
					},
				},
			});
			clearFocusList();
		},
		variables: {
			listId: list.id,
		},
	});

	return (
		<Modal
			basic
			onClose={() => setIsDeletingList(false)}
			onOpen={() => {
				setIsDeletingList(true);
			}}
			open={isDeletingList}
			size='small'>
			<Header icon>
				<Icon name='archive' />
				Delete "{list.title}" and all its Todos?
			</Header>
			<Modal.Content>
				<p>You can not undo this action</p>
			</Modal.Content>
			<Modal.Actions>
				<Button basic color='red' inverted onClick={() => setIsDeletingList(false)}>
					<Icon name='remove' /> No
				</Button>
				<Button
					color='green'
					inverted
					onClick={() => {
						deleteList();
						setIsDeletingList(false);
					}}>
					<Icon name='checkmark' /> Yes
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

const DELETE_LIST = gql`
	mutation deleteList($listId: ID) {
		deleteList(listId: $listId)
	}
`;

export default DeleteList;
