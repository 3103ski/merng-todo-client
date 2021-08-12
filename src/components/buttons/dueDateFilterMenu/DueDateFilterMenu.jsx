import React, { useState, useContext } from 'react';
import { Popup, Button } from 'semantic-ui-react';
import { Icon } from '@iconify/react-with-api';

import { GlobalContext } from '../../../context/global';
import * as style from './dueDateFilterMenu.module.scss';
import { checkDateToDateFilter } from '../../../util/helperFunctions';

const DueDateFilterMenu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { dateFilter, setDateFilter } = useContext(GlobalContext);

	const setFilter = (filter) => {
		setDateFilter(filter);
		setIsOpen(false);
	};

	const btnColor = (filter) => {
		return dateFilter === filter ? 'blue' : 'grey';
	};

	const FilterButton = ({ filter }) => (
		<Button
			color={btnColor(filter)}
			className={style.MenuButton}
			onClick={() => setFilter(filter)}>
			{filter}
		</Button>
	);

	return (
		<>
			<Popup
				trigger={
					<div className={style.TriggerIcon}>
						<Icon icon='carbon:calendar-heat-map' />
					</div>
				}
				flowing
				open={isOpen}
				onOpen={() => setIsOpen(true)}
				onClose={() => setIsOpen(false)}
				on='click'
				content={
					<div className={style.DateFilterMenu}>
						{checkDateToDateFilter(null, null, true).map((filter, i) => (
							<FilterButton filter={filter} key={`${filter}${i}`} />
						))}
					</div>
				}
			/>
			{dateFilter ? (
				<div className={style.ActiveFilterButton}>
					<p>{dateFilter}</p>
					<Icon onClick={() => setDateFilter(null)} icon='eva:close-fill' />
				</div>
			) : null}
		</>
	);
};

export default DueDateFilterMenu;
