import React, { createContext, useReducer } from 'react';

const initialState = {
	focusList: null,
	isolateMyDay: false,
	focusDateRange: null,
};

const GlobalContext = createContext(initialState);

const globalReducer = (state, { type, focusList }) => {
	switch (type) {
		case 'TOGGLE_MY_DAY_FILTER':
			return {
				...state,
				isolateMyDay: !state.isolateMyDay,
			};
		case 'CLEAR_FOCUS_LIST':
			return {
				...state,
				focusList: null,
			};
		case 'SET_FOCUS_LIST':
			return {
				...state,
				focusList,
			};
		default:
			return state;
	}
};

const GlobalProvider = (props) => {
	const [state, dispatch] = useReducer(globalReducer, initialState);

	const toggleMyDayFilter = () => {
		dispatch({ type: 'TOGGLE_MY_DAY_FILTER' });
	};

	const clearFocusList = () => {
		dispatch({ type: 'CLEAR_FOCUS_LIST' });
	};

	const setFocusList = (list) => {
		dispatch({ type: 'SET_FOCUS_LIST', focusList: list });
	};

	return (
		<GlobalContext.Provider
			value={{
				focusList: state.focusList,
				isolateMyDay: state.isolateMyDay,
				focusDateRange: state.focusDateRange,
				toggleMyDayFilter,
				clearFocusList,
				setFocusList,
			}}
			{...props}
		/>
	);
};

export { GlobalContext, GlobalProvider };
