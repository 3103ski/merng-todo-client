import React, { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';
import { updateObj } from '../util/helperFunctions';

const initialState = {
	user: null,
	userSettings: {
		darkMode: false,
		darkText: false,
		showPopups: false,
		squareEdges: false,
	},
};

console.log('state began here', initialState);

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
	initialState.userSettings = settings;
}

const AuthContext = createContext(initialState);

const authReducer = (state, action) => {
	console.log('auth reducer initial state:: ', initialState);
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
		case 'CLEAR_SETTINGS':
			return updateObj(state, {
				userSettings: initialState.userSettings,
			});
		default:
			return state;
	}
};

const AuthProvider = (props) => {
	const [state, dispatch] = useReducer(authReducer, initialState);

	const login = (userData) => {
		console.log('This user :: ', userData);
		localStorage.setItem('jwtToken', userData.token);
		localStorage.setItem('todoUserSettings', JSON.stringify({ ...userData.userSettings }));

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

	const clearSettings = () => {
		localStorage.removeItem('todoUserSettings');
		dispatch({ type: 'CLEAR_SETTINGS' });
	};

	return (
		<AuthContext.Provider
			value={{
				user: state.user,
				userSettings: state.userSettings,
				login,
				logout,
				updateSettings,
				clearSettings,
			}}
			{...props}
		/>
	);
};

export { AuthContext, AuthProvider };
