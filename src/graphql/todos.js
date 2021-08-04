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
			myDay
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
				myDay
				color
				listTitle
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
			myDay
			isComplete
			subTasks {
				title
				creatorId
				listId
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
			id
			myDay
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
