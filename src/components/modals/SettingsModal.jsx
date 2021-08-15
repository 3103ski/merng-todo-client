import React, { useState, useEffect, useContext } from 'react';

import { Modal, Button, Form, Grid, Label, Checkbox } from 'semantic-ui-react';
import { useMutation, gql } from '@apollo/client';

import { GET_USER_TODOS, UPDATE_USER_SETTINGS } from '../../graphql';
import { GlobalContext } from '../../context/global';
import { AuthContext } from '../../context/auth';

const EditSettings = () => {
	const { isEditingSettings, setIsEditingSettings } = useContext(GlobalContext);
	const { userSettings, updateSettings } = useContext(AuthContext);

	const [toggleDarkMode] = useMutation(UPDATE_USER_SETTINGS, {
		update(_, { data }) {
			console.log('update console :: ', data.updateSettings.userSettings);
			updateSettings(data.updateSettings.userSettings);
		},
		variables: {
			...userSettings,
			darkMode: !userSettings.darkMode,
		},
	});

	const [toggleDarkText] = useMutation(UPDATE_USER_SETTINGS, {
		update(
			_,
			{
				data: {
					updateSettings: { userSettings },
				},
			}
		) {
			updateSettings(userSettings);
		},
		variables: {
			...userSettings,
			darkText: !userSettings.darkText,
		},
	});

	return (
		<Modal
			onClose={() => {
				setIsEditingSettings(false);
			}}
			onOpen={() => setIsEditingSettings(true)}
			open={isEditingSettings}>
			<Modal.Header
				data-dark-text={userSettings.darkText ? 1 : 0}
				data-dark-mode={userSettings.darkMode ? 1 : 0}>
				Style Settings
			</Modal.Header>
			<Modal.Content>
				<Grid>
					<Grid.Row>
						<Grid.Column width={16}>
							<Label.Detail style={{ marginBottom: '15px' }}>
								Dark Mode :{' '}
								<Checkbox
									checked={userSettings.darkMode}
									onChange={toggleDarkMode}
									toggle
								/>
							</Label.Detail>
							<Label.Detail style={{ marginBottom: '15px' }}>
								Dark Text :{' '}
								<Checkbox
									checked={userSettings.darkText}
									onChange={toggleDarkText}
									toggle
								/>
							</Label.Detail>
							<Form.Field></Form.Field>

							<Button
								color='green'
								onClick={() => {
									setIsEditingSettings(false);
								}}>
								All Done
							</Button>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Modal.Content>
		</Modal>
	);
};

export default EditSettings;
