import React, { createContext, useReducer } from 'react';
import { updateObj } from '../util/helperFunctions';

const initialState = {
	focusList: null,
	dateFilter: null,
	isolateMyDay: false,
	isDeletingFocusListComplete: false,
	isDeletingAllComplete: false,
	isCreatingNewList: false,
	isEditingSettings: false,
	todoDeleteOptionVisible: false,
	expandAllSubTasks: false,
};

const GlobalContext = createContext(initialState);

const globalReducer = (state, { type, focusList, dateFilter, togglePayload }) => {
	switch (type) {
		case 'SET_FOCUS_LIST':
			return updateObj(state, { focusList });
		case 'SET_DATE_FILTER':
			return updateObj(state, { dateFilter });
		case 'GLOBAL_TOGGLE':
			return updateObj(state, { ...togglePayload });
		default:
			return state;
	}
};

const GlobalProvider = (props) => {
	const [state, dispatch] = useReducer(globalReducer, initialState);

	const globalToggle = (togglePayload) => {
		dispatch({ type: 'GLOBAL_TOGGLE', togglePayload });
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
				isDeletingAllComplete: state.isDeletingAllComplete,
				isCreatingNewList: state.isCreatingNewList,
				isEditingSettings: state.isEditingSettings,
				expandAllSubTasks: state.expandAllSubTasks,
				todoDeleteOptionVisible: state.todoDeleteOptionVisible,
				isDeletingFocusListComplete: state.isDeletingFocusListComplete,
				globalToggle,
				setFocusList,
				setDateFilter,
			}}
			{...props}
		/>
	);
};

export { GlobalContext, GlobalProvider };
