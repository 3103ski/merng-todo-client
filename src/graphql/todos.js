import { gql } from '@apollo/client';

export const DELETE_TODO = gql`
	mutation deleteTodo($todoId: ID!) {
		deleteTodo(todoId: $todoId) {
			id
			isSubTask
			listId
		}
	}
`;

export const GET_USER_TODOS = gql`
	query getUserTodos($userId: ID!) {
		getUserTodos(userId: $userId) {
			myDay
			title
			creatorId
			masterId
			listId
			color
			createdAt
			listTitle
			id
			dueDate
			comments {
				id
				text
				creatorId
				todoId
			}
			isSubTask
			isComplete
			subTasks {
				title
				creatorId
				listId
				masterId
				myDay
				color
				listTitle
				dueDate
				subTasks {
					id
				}
				isSubTask
				isComplete
				id
			}
		}
	}
`;

export const ADD_TODO_TO_LIST = gql`
	mutation addTodoItem($title: String!, $listId: ID!, $isSubTask: Boolean, $masterId: ID!) {
		addTodoListItem(
			listId: $listId
			masterId: $masterId
			title: $title
			isSubTask: $isSubTask
		) {
			title
			creatorId
			listId
			color
			createdAt
			listTitle
			id
			dueDate
			isSubTask
			masterId
			myDay
			isComplete
			todoUpdates {
				id
				text
				creatorId
				todoId
			}
			subTasks {
				title
				creatorId
				listId
				masterId
				color
				createdAt
				myDay
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
		updateTodo(todoId: $todoId, isComplete: $isComplete, updateType: "toggleComplete") {
			title
			creatorId
			listId
			color
			createdAt
			listTitle
			masterId
			id
			myDay
			dueDate
			isSubTask
			isComplete
			todoUpdates {
				id
				text
				creatorId
				todoId
			}
			subTasks {
				title
				creatorId
				listId
				color
				createdAt
				listTitle
				masterId
				myDay
				id
				dueDate
				isSubTask
				isComplete
			}
		}
	}
`;

export const TOGGLE_TODO_IS_MY_DAY = gql`
	mutation updateTodo($todoId: ID!, $myDay: Boolean!) {
		updateTodo(todoId: $todoId, myDay: $myDay, updateType: "myDay") {
			title
			creatorId
			listId
			myDay
			color
			createdAt
			listTitle
			id
			dueDate
			isSubTask
			isComplete
			todoUpdates {
				id
				text
				creatorId
				todoId
			}
			subTasks {
				title
				creatorId
				listId
				color
				myDay
				createdAt
				listTitle
				id
				dueDate
				isSubTask
				subTasks {
					id
				}
				isComplete
			}
		}
	}
`;
export const UPDATE_TODO_TITLE = gql`
	mutation updateTodo($todoId: ID!, $title: String!) {
		updateTodo(todoId: $todoId, title: $title, updateType: "title") {
			title
			creatorId
			listId
			myDay
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
				myDay
				createdAt
				listTitle
				id
				dueDate
				isSubTask
				subTasks {
					id
				}
				isComplete
			}
		}
	}
`;

export const SET_DUE_DATE = gql`
	mutation updateTodo($todoId: ID!, $dueDate: String!) {
		updateTodo(todoId: $todoId, dueDate: $dueDate, updateType: "dueDate") {
			title
			creatorId
			listId
			myDay
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
				myDay
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
