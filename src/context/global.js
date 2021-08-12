import React, { createContext, useReducer } from 'react';
import { updateObj } from '../util/helperFunctions';

const initialState = {
	focusList: null,
	isolateMyDay: false,
	dateFilter: null,
};

const GlobalContext = createContext(initialState);

const globalReducer = (state, { type, focusList, dateFilter }) => {
	switch (type) {
		case 'TOGGLE_MY_DAY_FILTER':
			return updateObj(state, { isolateMyDay: !state.isolateMyDay });
		case 'CLEAR_FOCUS_LIST':
			return updateObj(state, { focusList: null });
		case 'SET_FOCUS_LIST':
			return updateObj(state, { focusList });
		case 'SET_DATE_FILTER':
			return updateObj(state, { dateFilter });
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

	const setDateFilter = (df) => {
		dispatch({ type: 'SET_DATE_FILTER', dateFilter: df });
	};

	return (
		<GlobalContext.Provider
			value={{
				focusList: state.focusList,
				isolateMyDay: state.isolateMyDay,
				dateFilter: state.dateFilter,
				toggleMyDayFilter,
				clearFocusList,
				setFocusList,
				setDateFilter,
			}}
			{...props}
		/>
	);
};

export { GlobalContext, GlobalProvider };
