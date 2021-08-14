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

	// <Icon icon="akar-icons:circle" />
	// <Icon icon="akar-icons:circle-check" />
	return isComplete ? (
		<Icon
			icon='akar-icons:circle-check'
			onClick={toggleComplete}
			className={style.CompleteToggle}
		/>
	) : (
		<Icon icon='akar-icons:circle' onClick={toggleComplete} className={style.CompleteToggle} />
	);
};

export default ToggleTodoButton;
