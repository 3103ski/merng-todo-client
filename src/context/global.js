import React, { createContext, useReducer } from 'react';
import { updateObj } from '../util/helperFunctions';

const initialState = {
	focusList: null,
	isolateMyDay: false,
	dateFilter: null,
	isDeletingAllComplete: false,
	isCreatingNewList: false,
	isEditingSettings: false,
	todoDeleteOptionVisible: false,
	expandAllSubTasks: false,
};

const GlobalContext = createContext(initialState);

const globalReducer = (
	state,
	{
		type,
		focusList,
		dateFilter,
		isDeletingAllComplete,
		isCreatingNewList,
		isEditingSettings,
		expandAllSubTasks,
		todoDeleteOptionVisible,
	}
) => {
	switch (type) {
		case 'TOGGLE_MY_DAY_FILTER':
			return updateObj(state, { isolateMyDay: !state.isolateMyDay });
		case 'CLEAR_FOCUS_LIST':
			return updateObj(state, { focusList: null });
		case 'SET_FOCUS_LIST':
			return updateObj(state, { focusList });
		case 'SET_DATE_FILTER':
			return updateObj(state, { dateFilter });
		case 'SET_IS_DELETING_ALL_COMPLETE':
			return updateObj(state, { isDeletingAllComplete });
		case 'SET_IS_CREATING_NEW_LIST':
			return updateObj(state, { isCreatingNewList });
		case 'SET_IS_EDITING_SETTINGS':
			return updateObj(state, { isEditingSettings });
		case 'SET_EXPAND_ALL_SUB_TASKS':
			return updateObj(state, { expandAllSubTasks });
		case 'SET_TODO_DELETE_OPTION_VISIBLE':
			return updateObj(state, { todoDeleteOptionVisible });
		default:
			return state;
	}
};

const GlobalProvider = (props) => {
	const [state, dispatch] = useReducer(globalReducer, initialState);

	console.log('global state :: ', state);

	const toggleMyDayFilter = () => {
		dispatch({ type: 'TOGGLE_MY_DAY_FILTER' });
	};

	const clearFocusList = () => {
		dispatch({ type: 'CLEAR_FOCUS_LIST' });
	};

	const setIsDeletingAllComplete = (isDeletingAllComplete) => {
		dispatch({ type: 'SET_IS_DELETING_ALL_COMPLETE', isDeletingAllComplete });
	};

	const setIsCreatingNewList = (isCreatingNewList) => {
		dispatch({ type: 'SET_IS_CREATING_NEW_LIST', isCreatingNewList });
	};

	const setFocusList = (list) => {
		dispatch({ type: 'SET_FOCUS_LIST', focusList: list });
	};

	const setDateFilter = (df) => {
		dispatch({ type: 'SET_DATE_FILTER', dateFilter: df });
	};

	const setIsEditingSettings = (isEditingSettings) => {
		dispatch({ type: 'SET_IS_EDITING_SETTINGS', isEditingSettings });
	};

	const setExpandAllSubTasks = (expandAllSubTasks) => {
		dispatch({ type: 'SET_EXPAND_ALL_SUB_TASKS', expandAllSubTasks });
	};

	const setTodoDeleteOptionVisible = () => {
		dispatch({
			type: 'SET_TODO_DELETE_OPTION_VISIBLE',
			todoDeleteOptionVisible: !state.todoDeleteOptionVisible,
		});
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
				toggleMyDayFilter,
				clearFocusList,
				setFocusList,
				setDateFilter,
				setIsDeletingAllComplete,
				setIsCreatingNewList,
				setTodoDeleteOptionVisible,
				setIsEditingSettings,
				setExpandAllSubTasks,
			}}
			{...props}
		/>
	);
};

export { GlobalContext, GlobalProvider };
