import React, { useContext } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Grid, Loader, Container } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import { GlobalContext } from '../context/global';
import { GET_USER_LISTS } from '../util/graphql';
import { checkDateToDateFilter } from '../util/helperFunctions';

import {
	TodoListButton,
	TodoItem,
	TodoInput,
	FocusListMenu,
	CreateListModal,
	DeleteAllComplete,
} from '../components';

import * as style from './todoScreen.module.scss';

const TodoScreen = () => {
	const { user } = useContext(AuthContext);
	const { isolateMyDay, focusList, setFocusList, clearFocusList, dateFilter } =
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
		<Container>
			<Grid className={style.ContentContainer}>
				<Grid.Row className={style.ListRow}>
					<Grid.Column
						className={style.ListCollectionContainer}
						mobile={11}
						tablet={focusList ? 12 : 13}
						computer={focusList ? 13 : 14}>
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
					</Grid.Column>
					<Grid.Column
						mobile={5}
						tablet={focusList ? 4 : 3}
						computer={focusList ? 3 : 2}
						className={style.ListUtilityColumn}>
						<DeleteAllComplete userId={user.id} clearFocusList={clearFocusList} />
						<CreateListModal clearFocusList={clearFocusList} />
						{focusList ? (
							<FocusListMenu
								userId={user.id}
								list={focusList}
								setFocusList={setFocusList}
							/>
						) : null}
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
									todoData.getUserTodos.map((todo, i) => {
										if (
											!dateFilter ||
											checkDateToDateFilter(dateFilter, todo.dueDate)
										) {
											if (!todo.isComplete) {
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
										}
										return null;
									})}
							</>
						)}
						{loadingTodos ? (
							<Loader active={loadingTodos}>Loading Todos</Loader>
						) : (
							<>
								{todoData &&
									todoData.getUserTodos &&
									todoData.getUserTodos.map((todo, i) => {
										if (todo.isComplete) {
											if ((isolateMyDay && todo.myDay) || !isolateMyDay) {
												if (focusList && focusList.value === todo.listId) {
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
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Container>
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
