import React, { useState } from 'react';
import { Icon } from '@iconify/react-with-api';
import { useMutation } from '@apollo/client';
import { SET_DUE_DATE } from '../../../graphql/';
import { Popup } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const AssignDueDateModal = ({ todoId, dueDate, isSettingDate, setIsSettingDate, setMenuState }) => {
	const [calendarDate, setCalendarDate] = useState(
		dueDate ? new Date(Date.parse(dueDate)) : new Date()
	);
	const [isoDate, setIsoDate] = useState(dueDate ? dueDate : new Date().toISOString());

	const [setTodoDate] = useMutation(SET_DUE_DATE, {
		update(cache, { data }) {
			console.log('Cache', cache);
			console.log('Date', data);
			setIsSettingDate(false);
			setCalendarDate(new Date(data));
			setMenuState(true);
		},
		variables: {
			dueDate: isoDate,
			todoId,
		},
	});

	console.log('Starting Date:: ', dueDate);

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
