import React from 'react';
import { Icon } from '@iconify/react-with-api';
import { useMutation } from '@apollo/client';
import { TOGGLE_TODO_IS_MY_DAY } from '../../../../graphql';

const ToggleMyDayButton = ({ myDay, todoId }) => {
	const [setIsMyDay] = useMutation(TOGGLE_TODO_IS_MY_DAY, {
		variables: {
			myDay: !myDay,
			todoId,
		},
	});

	return !myDay ? (
		<Icon icon='fluent:weather-partly-cloudy-day-24-regular' onClick={setIsMyDay} />
	) : (
		<Icon icon='fluent:weather-partly-cloudy-day-24-filled' onClick={setIsMyDay} />
	);
};

export default ToggleMyDayButton;
