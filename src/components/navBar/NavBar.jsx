import React, { useState, useContext } from 'react';
import { Menu } from 'semantic-ui-react';
import { Icon } from '@iconify/react-with-api';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/auth';
import { GlobalContext } from '../../context/global';
import * as style from './navBar.module.scss';
import { DueDateFilterMenu, UserMenu, FocusListMenu } from '../../components/';

export const NavLinks = () => {
	const { user, userSettings } = useContext(AuthContext);
	const {
		isolateMyDay,
		todoDeleteOptionVisible,
		setTodoDeleteOptionVisible,
		toggleMyDayFilter,
		focusList,
		expandAllSubTasks,
		setExpandAllSubTasks,
	} = useContext(GlobalContext);

	const [activeItem, setActiveItem] = useState('login');
	console.log('The nav sees ', todoDeleteOptionVisible);

	const handleItemClick = (e, { name }) => setActiveItem(name);

	return (
		<div className={style.NavOuterContainer}>
			<Menu
				pointing
				secondary
				className={style.NavInnerContainer}
				data-dark-mode={userSettings.darkMode ? 1 : 0}>
				{user && (
					<div className={style.FilterIcons}>
						<div
							name='isolateMyDay'
							active={activeItem === 'isolateMyDay'}
							className={style.IconWrapper}
							data-dark-icon={userSettings.darkMode ? 1 : 0}
							onClick={toggleMyDayFilter}>
							{isolateMyDay ? (
								<Icon icon='fluent:weather-partly-cloudy-day-24-filled' />
							) : (
								<Icon icon='fluent:weather-partly-cloudy-day-16-regular' />
							)}
						</div>

						<div
							className={style.IconWrapper}
							onClick={() => setExpandAllSubTasks(!expandAllSubTasks)}
							data-dark-icon={userSettings.darkMode ? 1 : 0}>
							<Icon icon='ic:baseline-expand' />
						</div>

						<div
							className={style.IconWrapper}
							data-dark-icon={userSettings.darkMode ? 1 : 0}>
							<DueDateFilterMenu />
						</div>
					</div>
				)}

				<Menu.Menu position='right'>
					{!user ? (
						<>
							<Menu.Item
								data-dark-icon={userSettings.darkMode ? 1 : 0}
								name='register'
								as={Link}
								to='/register'
								active={activeItem === 'register'}
								onClick={handleItemClick}
							/>
							<Menu.Item
								data-dark-icon={userSettings.darkMode ? 1 : 0}
								name='login'
								as={Link}
								to='/login'
								active={activeItem === 'login'}
								onClick={handleItemClick}
							/>
						</>
					) : (
						<>
							{focusList ? (
								<Menu.Item>
									<FocusListMenu />
								</Menu.Item>
							) : null}
							<Menu.Item
								onClick={() => {
									setTodoDeleteOptionVisible();
								}}
								style={{ padding: '13px 0' }}>
								<Icon
									data-dark-icon={userSettings.darkMode ? 1 : 0}
									icon='codicon:trash'
								/>
							</Menu.Item>

							<UserMenu />
						</>
					)}
				</Menu.Menu>
			</Menu>
		</div>
	);
};

export default NavLinks;
