import gql from 'graphql-tag';

export const LOGIN_USER = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			token
			id
			username
		}
	}
`;

export const REGISTER_USER = gql`
	mutation register(
		$username: String!
		$email: String!
		$password: String!
		$confirmPassword: String!
	) {
		register(
			username: $username
			email: $email
			password: $password
			confirmPassword: $confirmPassword
		) {
			token
			id
			username
			email
		}
	}
`;

export const UPDATE_SETTINGS = gql`
	mutation updateSettings($darkMode: Boolean, $darkText: Boolean, $squareEdges: Boolean) {
		updateSettings(darkMode: $darkMode, darkText: $darkText, squareEdges: $squareEdges) {
			darkMode
			darkText
			squareEdges
		}
	}
`;

export const GET_USER_LISTS = gql`
	query getUserLists($userId: ID!) {
		getUserLists(userId: $userId) {
			creatorId
			color
			id
			title
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

export const CREATE_TODO_LIST = gql`
	mutation createNewTodoList($title: String!, $color: String!) {
		createTodoList(title: $title, color: $color) {
			title
			id
			creatorId
			color
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
