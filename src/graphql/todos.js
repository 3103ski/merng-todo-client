import { gql } from '@apollo/client';

export const DELETE_TODO = gql`
	mutation deleteTodo($todoId: ID!) {
		deleteTodo(todoId: $todoId) {
			id
		}
	}
`;

export const GET_USER_TODOS = gql`
	query getUserTodos($userId: ID!) {
		getUserTodos(userId: $userId) {
			title
			creatorId
			listId
			color
			createdAt
			listTitle
			id
			dueDate
			isSubTask
			isComplete
			subTasks {
				title
				creatorId
				listId
				color
				createdAt
				listTitle
				id
				dueDate
				isSubTask
				isComplete
			}
		}
	}
`;

export const ADD_TODO_TO_LIST = gql`
	mutation addTodoItem($title: String!, $listId: ID!) {
		addTodoListItem(listId: $listId, masterId: $listId, title: $title) {
			title
			creatorId
			listId
			color
			createdAt
			listTitle
			id
			dueDate
			isSubTask
			isComplete
			subTasks {
				title
				creatorId
				listId
				color
				createdAt
				listTitle
				id
				dueDate
				isSubTask
				isComplete
			}
		}
	}
`;

export const TOGGLE_TODO_IS_COMPLETE = gql`
	mutation updateTodo($todoId: ID!, $isComplete: Boolean!) {
		updateTodo(todoId: $todoId, isComplete: $isComplete) {
			title
			creatorId
			listId
			color
			createdAt
			listTitle
			id
			dueDate
			isSubTask
			isComplete
			subTasks {
				title
				creatorId
				listId
				color
				createdAt
				listTitle
				id
				dueDate
				isSubTask
				isComplete
			}
		}
	}
`;
