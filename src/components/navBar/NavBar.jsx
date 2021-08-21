import React, { useContext } from 'react';
import { Menu, Popup } from 'semantic-ui-react';
import { Icon } from '@iconify/react-with-api';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/auth';
import { GlobalContext } from '../../context/global';
import * as style from './navBar.module.scss';
import { DueDateFilterMenu, UserMenu, FocusListMenu } from '../../components/';

export const NavLinks = () => {
	const { user, userSettings } = useContext(AuthContext);
	const { isolateMyDay, todoDeleteOptionVisible, focusList, expandAllSubTasks, globalToggle } =
		useContext(GlobalContext);

	const myDayFilterButton = (
		<div
			name='isolateMyDay'
			className={style.IconWrapper}
			data-dark-icon={userSettings.darkMode ? 1 : 0}
			onClick={() => globalToggle({ isolateMyDay: !isolateMyDay })}>
			{isolateMyDay ? (
				<Icon icon='fluent:weather-partly-cloudy-day-24-filled' />
			) : (
				<Icon icon='fluent:weather-partly-cloudy-day-16-regular' />
			)}
		</div>
	);

	const subTasksButton = (
		<div
			className={style.IconWrapper}
			onClick={() =>
				globalToggle({
					expandAllSubTasks: !expandAllSubTasks,
				})
			}
			data-dark-icon={userSettings.darkMode ? 1 : 0}>
			<Icon icon='ic:baseline-expand' />
		</div>
	);

	const dateFilterButton = (
		<div className={style.IconWrapper} data-dark-icon={userSettings.darkMode ? 1 : 0}>
			<DueDateFilterMenu />
		</div>
	);

	const deleteToggleButton = (
		<Menu.Item
			onClick={() => {
				globalToggle({
					todoDeleteOptionVisible: !todoDeleteOptionVisible,
				});
			}}
			style={{ padding: '13px 0' }}>
			<Icon data-dark-icon={userSettings.darkMode ? 1 : 0} icon='codicon:trash' />
		</Menu.Item>
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

				<Menu.Menu position='right'>
					{!user ? (
						<>
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
						</>
					) : (
						<>
							{focusList ? (
								<Menu.Item>
									<FocusListMenu />
								</Menu.Item>
							) : null}
							{userSettings.showPopups ? (
								<Popup
									content='Toggle between completing and deleting todos'
									trigger={deleteToggleButton}
								/>
							) : (
								deleteToggleButton
							)}

							<UserMenu />
						</>
					)}
				</Menu.Menu>
			</Menu>
		</div>
	);
};

export default NavLinks;
