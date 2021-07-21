import React from 'react';
import { Popup } from 'semantic-ui-react';

import * as style from './todoListButton.module.scss';

const TodoListButton = ({ list, isolatedList, setIsolatedList }) => {
	return (
		<Popup
			content={
				!isolatedList
					? `Isolate ${list.title}`
					: isolatedList.value !== list.id
					? `Isolate ${list.title}`
					: `Remove Filter`
			}
			trigger={
				<div
					id={list.id}
					style={{ backgroundColor: list.color }}
					className={`${style.Container} ${
						isolatedList && isolatedList.value !== list.id ? style.NotSelected : null
					} `}
					onClick={() => {
						if (isolatedList && isolatedList.value === list.id) {
							setIsolatedList(null);
						}
						if ((isolatedList && isolatedList.value !== list.id) || !isolatedList) {
							setIsolatedList({ value: list.id, color: list.color });
						}
					}}>
					<p>{list.title}</p>
				</div>
			}
		/>
	);
};

export default TodoListButton;
