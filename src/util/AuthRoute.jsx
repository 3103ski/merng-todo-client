import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../context/auth';

const AuthRoute = ({ path, component: Component, ...rest }) => {
	const { user } = useContext(AuthContext);
	return (
		<Route
			{...rest}
			render={(props) => {
				if (!user) {
					// clearSettings();
					localStorage.removeItem('token');
				}
				return !user ? <Redirect to='/login' /> : <Component {...props} />;
			}}
		/>
	);
};

export default AuthRoute;
