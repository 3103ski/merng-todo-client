import React, { useState } from 'react';

import * as style from './toggleComplete.module.scss';

import { Icon } from '@iconify/react-with-api';
import { useMutation } from '@apollo/client';

import { TOGGLE_TODO_IS_COMPLETE } from '../../../graphql';

const ToggleTodoButton = ({ todo }) => {
	const [isComplete, setIsComplete] = useState(todo.isComplete);

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
			icon='bx:bx-checkbox-checked'
			onClick={toggleComplete}
			className={style.CompleteToggle}
		/>
	) : (
		<Icon icon='bx:bx-checkbox' onClick={toggleComplete} className={style.CompleteToggle} />
	);
};

export default ToggleTodoButton;
