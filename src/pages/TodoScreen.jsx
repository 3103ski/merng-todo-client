import React, { useContext, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Grid, Loader, Container } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import { GET_USER_LISTS } from '../util/graphql';
import { TodoListButton, TodoItem, TodoInput, FocusListMenu } from '../components';
import { CreateListModal, DeleteAllComplete } from '../modals/';

import * as style from './todoScreen.module.scss';

const TodoScreen = () => {
	const { user } = useContext(AuthContext);
	const [isolatedList, setIsolatedList] = useState(null);

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
						width={isolatedList ? 13 : 14}>
						{loadingLists ? (
							<Loader active={loadingLists}>Loading Todo Lists</Loader>
						) : (
							<>
								{listData &&
									listData.getUserLists &&
									listData.getUserLists.map((list, i) => {
										return (
											<TodoListButton
												setIsolatedList={setIsolatedList}
												isolatedList={isolatedList}
												key={list.id}
												list={list}
											/>
										);
									})}
							</>
						)}
					</Grid.Column>
					<Grid.Column width={isolatedList ? 3 : 2} className={style.ListUtilityColumn}>
						<DeleteAllComplete
							userId={user.id}
							clearIsolatedList={() => setIsolatedList(null)}
						/>
						<CreateListModal clearIsolatedList={() => setIsolatedList(null)} />
						{isolatedList ? (
							<FocusListMenu userId={user.id} list={isolatedList} />
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
										if (!todo.isComplete) {
											if (
												isolatedList &&
												isolatedList.value === todo.listId
											) {
												return (
													<TodoItem
														key={`${todo.id}${i}`}
														todoItem={todo}
													/>
												);
											} else if (!isolatedList) {
												return (
													<TodoItem
														key={`${todo.id}${i}`}
														todoItem={todo}
													/>
												);
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
											if (
												isolatedList &&
												isolatedList.value === todo.listId
											) {
												return (
													<TodoItem
														key={`${todo.id}${i}`}
														todoItem={todo}
													/>
												);
											} else if (!isolatedList) {
												return (
													<TodoItem
														key={`${todo.id}${i}`}
														todoItem={todo}
													/>
												);
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
							<TodoInput isolatedList={isolatedList} lists={listData.getUserLists} />
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
			id
			dueDate
			isSubTask
			isComplete
			subTasks {
				title
				creatorId
				listId
				myDay
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
