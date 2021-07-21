import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Loader, Container, Transition } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import { GET_USER_LISTS, GET_USER_TODOS } from '../util/graphql';
import { TodoListButton, TodoItem, TodoInput } from '../components';
import { CreateListModal } from '../modals/';

import * as style from './todoScreen.module.scss';

const TodoScreen = () => {
	const { user } = useContext(AuthContext);

	const [isolatedList, setIsolatedList] = useState(null);

	const userId = user.id;

	const { loading: loadingLists, data: listData } = useQuery(GET_USER_LISTS, {
		variables: { userId },
	});

	const { loading: loadingTodos, data: todoData } = useQuery(GET_USER_TODOS, {
		variables: { userId },
	});

	console.log(isolatedList);

	return (
		<Container>
			<Grid className={style.ContentContainer}>
				<Grid.Row className={style.ListRow}>
					<Grid.Column className={style.ListCollectionContainer} width={14}>
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
					<Grid.Column width={2} className={style.ListUtilityColumn}>
						<CreateListModal />
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

export default TodoScreen;
