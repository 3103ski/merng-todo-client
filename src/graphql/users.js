import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			token
			id
			username
			userSettings {
				darkMode
				darkText
				squareEdges
			}
		}
	}
`;

export const UPDATE_USER_SETTINGS = gql`
	mutation updateSettings($darkMode: Boolean, $darkText: Boolean, $squareEdges: Boolean) {
		updateSettings(darkMode: $darkMode, darkText: $darkText, squareEdges: $squareEdges) {
			userSettings {
				darkMode
				darkText
				squareEdges
			}
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
