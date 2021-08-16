import { gql } from '@apollo/client';

export const GET_USER_LISTS = gql`
	query getUserLists($userId: ID!) {
		getUserLists(userId: $userId) {
			creatorId
			color
			id
			todos
			title
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
