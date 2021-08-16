import React, { useContext } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Icon } from '@iconify/react-with-api';
import { Grid, Loader } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import { GlobalContext } from '../context/global';
import { GET_USER_LISTS } from '../util/graphql';
import { checkDateToDateFilter } from '../util/helperFunctions';

import {
	TodoListButton,
	TodoItem,
	TodoInput,
	CreateListModal,
	SettingsModal,
	DeleteAllComplete,
} from '../components';

import * as style from './todoScreen.module.scss';

const TodoScreen = () => {
	const { user, userSettings } = useContext(AuthContext);
	const { isolateMyDay, focusList, setFocusList, dateFilter, setIsCreatingNewList } =
		useContext(GlobalContext);

	const { loading: loadingLists, data: listData } = useQuery(GET_USER_LISTS, {
		variables: { userId: user.id },
	});
	const { loading: loadingTodos, data: todoData } = useQuery(GET_TODOS, {
		variables: { userId: user.id },
	});

	return !user ? (
		<Redirect to='/login' />
	) : (
		<>
			<Grid className={style.ContentContainer}>
				<Grid.Row className={style.ListRow}>
					<Grid.Column className={style.ListCollectionCol}>
						<div className={style.AddListIconContainer}>
							<Icon
								onClick={() => setIsCreatingNewList(true)}
								data-dark-icon={userSettings.darkMode ? 1 : 0}
								icon={
									userSettings.darkMode
										? 'fluent:add-circle-16-filled'
										: 'fluent:add-circle-16-regular'
								}
							/>
						</div>

						<div className={style.ListCollection}>
							{loadingLists ? (
								<Loader active={loadingLists}>Loading Todo Lists</Loader>
							) : (
								<>
									{listData &&
										listData.getUserLists &&
										listData.getUserLists.map((list, i) => {
											return (
												<TodoListButton
													setFocusList={setFocusList}
													key={list.id}
													list={list}
												/>
											);
										})}
								</>
							)}
						</div>
					</Grid.Column>
				</Grid.Row>

				<Grid.Row className={style.TodoRow}>
					<Grid.Column
						className={style.TodosContainer}
						width={16}
						style={{ minHeight: '100px', width: '100%' }}>
						{loadingTodos ? (
							<Loader active={loadingTodos}>Loading Todos</Loader>
						) : (
							<>
								{todoData &&
									todoData.getUserTodos &&
									[...todoData.getUserTodos]
										.sort((a, b) => {
											return a.isComplete - b.isComplete;
										})
										.map((todo, i) => {
											if (
												!dateFilter ||
												checkDateToDateFilter(dateFilter, todo.dueDate)
											) {
												if ((isolateMyDay && todo.myDay) || !isolateMyDay) {
													if (
														focusList &&
														focusList.value === todo.listId
													) {
														return (
															<TodoItem
																key={`${todo.id}${i}`}
																todoItem={todo}
															/>
														);
													} else if (!focusList) {
														return (
															<TodoItem
																key={`${todo.id}${i}`}
																todoItem={todo}
															/>
														);
													}
												}
											}
											return null;
										})}
							</>
						)}
					</Grid.Column>
				</Grid.Row>
			</Grid>

			<Grid className={style.InputContainer}>
				<Grid.Row className={style.InputRow}>
					<Grid.Column width={16}>
						{listData && listData.getUserLists.length > 0 && (
							<TodoInput lists={listData.getUserLists} />
						)}
						<DeleteAllComplete />
						<CreateListModal />
						<SettingsModal />
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</>
	);
};

const GET_TODOS = gql`
	query ($userId: ID!) {
		getUserTodos(userId: $userId) {
			title
			creatorId
			listId
			color
			createdAt
			listTitle
			myDay
			masterId
			id
			dueDate
			isSubTask
			isComplete
			subTasks {
				title
				masterId
				creatorId
				listId
				myDay
				id
				color
				listTitle
				dueDate
				isSubTask
				isComplete
			}
		}
	}
`;

export default TodoScreen;
