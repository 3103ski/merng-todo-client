import React, { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';
import { updateObj } from '../util/helperFunctions';

const initialState = {
	user: null,
	userSettings: {
		darkMode: false,
		darkText: false,
		squareEdges: false,
	},
};

if (localStorage.getItem('jwtToken')) {
	const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));

	if (decodedToken.exp * 1000 < Date.now()) {
		localStorage.removeItem('jwtToken');
	} else {
		initialState.user = decodedToken;
	}
}

if (localStorage.getItem('todoUserSettings')) {
	const settings = JSON.parse(localStorage.getItem('todoUserSettings'));
	console.log('starting settings :: ', settings);
	initialState.userSettings = settings;
}

const AuthContext = createContext(initialState);

const authReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return updateObj(state, {
				user: action.payload,
				userSettings: action.payload.userSettings,
			});
		case 'LOGOUT':
			return initialState;
		case 'UPDATE_SETTINGS':
			return updateObj(state, {
				userSettings: action.userSettings,
			});
		default:
			return state;
	}
};

const AuthProvider = (props) => {
	const [state, dispatch] = useReducer(authReducer, initialState);

	const login = (userData) => {
		localStorage.setItem('jwtToken', userData.token);
		localStorage.setItem('todoUserSettings', JSON.stringify({ ...userData.userSettings }));
		console.log('User logged in :: ', userData);

		dispatch({ type: 'LOGIN', payload: userData });
	};

	const logout = () => {
		localStorage.removeItem('jwtToken');
		localStorage.removeItem('todoUserSettings');
		dispatch({ type: 'LOGOUT' });
	};

	const updateSettings = (userSettings) => {
		localStorage.setItem('todoUserSettings', JSON.stringify({ ...userSettings }));
		dispatch({ type: 'UPDATE_SETTINGS', userSettings });
	};

	return (
		<AuthContext.Provider
			value={{
				user: state.user,
				userSettings: state.userSettings,
				login,
				logout,
				updateSettings,
			}}
			{...props}
		/>
	);
};

export { AuthContext, AuthProvider };
