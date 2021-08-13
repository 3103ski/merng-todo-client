import moment from 'moment';

export const updateObj = (obj, newData) => {
	return {
		...obj,
		...newData,
	};
};

export const checkDateToDateFilter = (filter, date, getFilters) => {
	if (getFilters) {
		// All added filters should have a case in the switch below
		return [
			'Today',
			'Tomorrow',
			'This Week',
			'Next Week',
			'This Month',
			'Next Month',
			'Past Due',
		];
	}
	if (date && filter) {
		const now = moment(new Date());
		const dueDate = moment(date);

		switch (filter) {
			case 'Today':
				return now.dayOfYear() === dueDate.dayOfYear();
			case 'Tomorrow':
				return now.add(1, 'd').dayOfYear() === dueDate.dayOfYear();
			case 'This Week':
				return now.week() === dueDate.week();
			case 'Next Week':
				return now.add(1, 'w').week() === dueDate.week();
			case 'This Month':
				return now.month() === dueDate.month();
			case 'Next Month':
				return now.add(1, 'M').month() === dueDate.month();
			case 'Past Due':
				return dueDate.isBefore(now, 'date');
			default:
				return false;
		}
	}
};
