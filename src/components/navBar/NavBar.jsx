import React, { useState, useContext } from 'react';
import { Menu, Popup } from 'semantic-ui-react';
import { Icon } from '@iconify/react-with-api';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/auth';
import { GlobalContext } from '../../context/global';
import * as style from './navBar.module.scss';
import { DueDateFilterMenu, UserMenu } from '../../components/';

export const NavLinks = () => {
	const { user, logout } = useContext(AuthContext);
	const { isolateMyDay, toggleMyDayFilter } = useContext(GlobalContext);

	const [activeItem, setActiveItem] = useState('login');

	const handleItemClick = (e, { name }) => setActiveItem(name);

	return (
		<div className={style.NavOuterContainer}>
			<Menu pointing secondary className={style.NavOuterContainer}>
				{user && (
					<>
						<Menu.Item
							name='isolateMyDay'
							active={activeItem === 'isolateMyDay'}
							onClick={toggleMyDayFilter}>
							{isolateMyDay ? (
								<Icon icon='fluent:weather-partly-cloudy-day-24-filled' />
							) : (
								<Icon icon='fluent:weather-partly-cloudy-day-16-regular' />
							)}
						</Menu.Item>

						<Menu.Item>
							<DueDateFilterMenu />
						</Menu.Item>
					</>
				)}

				<Menu.Menu position='right'>
					{!user ? (
						<>
							<Menu.Item
								name='register'
								as={Link}
								to='/register'
								active={activeItem === 'register'}
								onClick={handleItemClick}
							/>
							<Menu.Item
								name='login'
								as={Link}
								to='/login'
								active={activeItem === 'login'}
								onClick={handleItemClick}
							/>
						</>
					) : (
						// <Popup
						// 	content='Logout'
						// 	trigger={
						// 		<Menu.Item
						// 			as={Link}
						// 			to='/login'
						// 			name='logout'
						// 			active={activeItem === 'logout'}
						// 			onClick={logout}>
						// 			<Icon icon='ls:logout' />
						// 		</Menu.Item>
						// 	}
						// />
						<UserMenu />
					)}
				</Menu.Menu>
			</Menu>
		</div>
	);
};

export default NavLinks;
