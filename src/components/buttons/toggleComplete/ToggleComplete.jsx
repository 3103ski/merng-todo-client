import React, { useState, useContext } from 'react';

import * as style from './toggleComplete.module.scss';

import { Icon } from '@iconify/react-with-api';
import { useMutation } from '@apollo/client';
import { AuthContext } from '../../../context/auth';

import { TOGGLE_TODO_IS_COMPLETE } from '../../../graphql';

const ToggleTodoButton = ({ todo }) => {
	const [isComplete, setIsComplete] = useState(todo.isComplete);
	const { userSettings } = useContext(AuthContext);

	const [toggleComplete] = useMutation(TOGGLE_TODO_IS_COMPLETE, {
		update() {
			setIsComplete(!isComplete);
		},
		onError(err) {
			console.log('there has been an error', err);
		},
		variables: {
			todoId: todo.id,
			isComplete: !todo.isComplete,
		},
	});

	return isComplete ? (
		<Icon
			data-dark-icon={userSettings.darkMode ? 1 : 0}
			icon='akar-icons:circle-check'
			onClick={toggleComplete}
			className={style.CompleteToggle}
		/>
	) : (
		<Icon
			data-dark-icon={userSettings.darkMode ? 1 : 0}
			icon='akar-icons:circle'
			onClick={toggleComplete}
			className={style.CompleteToggle}
		/>
	);
};

export default ToggleTodoButton;
