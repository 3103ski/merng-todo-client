import React, { useState } from 'react';
import { Icon } from '@iconify/react-with-api';
import { useMutation } from '@apollo/client';
import { SET_DUE_DATE } from '../../../../graphql';
import { Popup } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const AssignDueDateModal = ({ todoId, dueDate, isSettingDate, setIsSettingDate, setMenuState }) => {
	const [calendarDate, setCalendarDate] = useState(
		dueDate ? new Date(Date.parse(dueDate)) : new Date()
	);
	const [isoDate, setIsoDate] = useState(dueDate ? dueDate : new Date().toISOString());

	const [setTodoDate] = useMutation(SET_DUE_DATE, {
		update() {
			setIsSettingDate(false);
			setMenuState(true);
		},
		variables: {
			dueDate: isoDate,
			todoId,
		},
	});

	return (
		<Popup
			content={
				<div>
					<DatePicker
						selected={calendarDate}
						inline
						onChange={async (date) => {
							const isoDate = await new Date(date).toISOString();
							await setCalendarDate(date);
							await setIsoDate(isoDate);
							setTodoDate();
						}}
					/>
					<button
						onClick={async () => {
							await setIsoDate('');
							return setTodoDate();
						}}>
						Clear Due Date
					</button>
				</div>
			}
			on='click'
			onClose={() => {
				setIsSettingDate(false);
				setMenuState(true);
			}}
			onOpen={() => setIsSettingDate(true)}
			open={isSettingDate}
			trigger={<Icon icon='carbon:calendar-heat-map' />}
		/>
	);
};

export default AssignDueDateModal;
