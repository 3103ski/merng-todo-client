import React, { useState, useContext } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';

export const NavLinks = () => {
	const { user, logout } = useContext(AuthContext);
	const [activeItem, setActiveItem] = useState('login');
	const handleItemClick = (e, { name }) => setActiveItem(name);

	return (
		<div>
			<Menu pointing secondary>
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
						<Menu.Item
							as={Link}
							to='/login'
							name='logout'
							active={activeItem === 'logout'}
							onClick={logout}
						/>
					)}
				</Menu.Menu>
			</Menu>
		</div>
	);
};

export default NavLinks;
