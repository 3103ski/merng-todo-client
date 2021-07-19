import React, { useContext } from 'react';

import { AuthContext } from '../context/auth';

const TodoScreen = () => {
	const { user } = useContext(AuthContext);
	console.log(user);
	return (
		<div>
			<h1>todos</h1>
		</div>
	);
};

export default TodoScreen;
