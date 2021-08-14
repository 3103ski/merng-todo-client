import React, { useState, useContext } from 'react';
import { Menu } from 'semantic-ui-react';
import { Icon } from '@iconify/react-with-api';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/auth';
import { GlobalContext } from '../../context/global';
import * as style from './navBar.module.scss';
import { DueDateFilterMenu, UserMenu, FocusListMenu } from '../../components/';

export const NavLinks = () => {
	const { user } = useContext(AuthContext);
	const { isolateMyDay, toggleMyDayFilter, focusList } = useContext(GlobalContext);

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
						<>
							{focusList ? (
								<Menu.Item>
									<FocusListMenu />
								</Menu.Item>
							) : null}
							<UserMenu />
						</>
					)}
				</Menu.Menu>
			</Menu>
		</div>
	);
};

export default NavLinks;
