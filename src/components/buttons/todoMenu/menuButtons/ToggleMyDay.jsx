import React, { useContext } from 'react';
import { Icon } from '@iconify/react-with-api';
import { useMutation } from '@apollo/client';

import * as style from './menuButtons.module.scss';
import { AuthContext } from '../../../../context/auth';

import { TOGGLE_TODO_IS_MY_DAY } from '../../../../graphql';

const ToggleMyDayButton = ({ myDay, todoId }) => {
	const { userSettings } = useContext(AuthContext);
	const [setIsMyDay] = useMutation(TOGGLE_TODO_IS_MY_DAY, {
		variables: {
			myDay: !myDay,
			todoId,
		},
	});

	return (
		<div data-dark className={style.IconButtonContainer}>
			{!myDay ? (
				<Icon
					style={{ opacity: myDay ? '1' : '.5' }}
					data-dark-mode-text={userSettings.darkText ? 1 : 0}
					icon='fluent:weather-partly-cloudy-day-24-regular'
					onClick={setIsMyDay}
				/>
			) : (
				<Icon
					style={{ opacity: myDay ? '1' : '.5' }}
					data-dark-mode-text={userSettings.darkText ? 1 : 0}
					icon='fluent:weather-partly-cloudy-day-24-filled'
					onClick={setIsMyDay}
				/>
			)}
		</div>
	);
};

export default ToggleMyDayButton;
