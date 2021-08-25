import React, { useContext } from 'react';
import { Menu, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/auth';
import { GlobalContext } from '../../context/global';
import { DueDateFilterMenu, UserMenu, FocusListMenu, NavIconButton } from '../../components/';

import * as style from './navBar.module.scss';

export const NavLinks = () => {
	const { user, userSettings } = useContext(AuthContext);
	const { isolateMyDay, todoDeleteOptionVisible, focusList, expandAllSubTasks, globalToggle } =
		useContext(GlobalContext);

	const myDayFilterButton = (
		<NavIconButton
			icon={
				isolateMyDay
					? 'fluent:weather-partly-cloudy-day-24-filled'
					: 'fluent:weather-partly-cloudy-day-16-regular'
			}
			active={isolateMyDay}
			callback={() => globalToggle({ isolateMyDay: !isolateMyDay })}
		/>
	);

	const subTasksButton = (
		<NavIconButton
			icon='ic:baseline-expand'
			active={expandAllSubTasks}
			callback={() =>
				globalToggle({
					expandAllSubTasks: !expandAllSubTasks,
				})
			}
		/>
	);

	const dateFilterButton = (
		<div>
			<DueDateFilterMenu />
		</div>
	);

	const deleteToggleButton = (
		<NavIconButton
			active={todoDeleteOptionVisible}
			callback={() =>
				globalToggle({
					todoDeleteOptionVisible: !todoDeleteOptionVisible,
				})
			}
			icon='codicon:trash'
		/>
	);

	const filterButtons = userSettings.showPopups ? (
		<>
			<Popup
				content="Filter list to only show todos with 'MyDay' icon selected"
				trigger={myDayFilterButton}
			/>
			<Popup content='Expand or collapse subtasks for all todos' trigger={subTasksButton} />
			<Popup content='Set a calendar filter' trigger={dateFilterButton} />
		</>
	) : (
		<>
			{myDayFilterButton}
			{subTasksButton}
			{dateFilterButton}
		</>
	);

	return (
		<div className={style.NavOuterContainer}>
			<Menu
				pointing
				secondary
				className={style.NavInnerContainer}
				data-dark-mode={userSettings.darkMode ? 1 : 0}>
				{user && <div className={style.FilterIcons}>{filterButtons}</div>}

				{!user ? (
					<div className={style.MenuRight}>
						<Menu.Item
							data-dark-icon={userSettings.darkMode ? 1 : 0}
							name='register'
							as={Link}
							to='/register'
						/>
						<Menu.Item
							data-dark-icon={userSettings.darkMode ? 1 : 0}
							name='login'
							as={Link}
							to='/login'
						/>
					</div>
				) : (
					<div className={style.MenuRight}>
						{focusList ? <FocusListMenu /> : null}
						{userSettings.showPopups ? (
							<Popup
								content='Toggle between completing and deleting todos'
								trigger={deleteToggleButton}
							/>
						) : (
							deleteToggleButton
						)}
						{userSettings.showPopups ? (
							<Popup
								content='User Menu'
								trigger={
									<div>
										<UserMenu />
									</div>
								}
							/>
						) : (
							<UserMenu />
						)}
					</div>
				)}
			</Menu>
		</div>
	);
};

export default NavLinks;
