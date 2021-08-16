import React, { useState } from 'react';
import moment from 'moment';
import { Icon } from '@iconify/react-with-api';
import { useMutation } from '@apollo/client';
import { Popup } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { SET_DUE_DATE } from '../../../../graphql';

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

	let displayDate = '';
	if (dueDate !== '') {
		displayDate = moment(new Date(dueDate)).format('dddd MMM Do YYYY');
	}

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
			trigger={
				dueDate !== '' ? (
					<Popup
						content={displayDate}
						trigger={
							<Icon
								data-full-opacity={dueDate ? 1 : 0}
								icon='carbon:calendar-heat-map'
							/>
						}
					/>
				) : (
					<Icon data-full-opacity={dueDate ? 1 : 0} icon='carbon:calendar-heat-map' />
				)
			}
		/>
	);
};

export default AssignDueDateModal;
