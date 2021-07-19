import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import { RegisterPage, LoginPage, TodoScreen } from './pages/';
import { NavLinks } from './components/';
import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute.jsx';

function App() {
	return (
		<AuthProvider>
			<Router>
				<Container>
					<NavLinks />
					<Route exact path='/todos' component={TodoScreen} />
					<AuthRoute exact path='/register' component={RegisterPage} />
					<AuthRoute exact path='/login' component={LoginPage} />
				</Container>
			</Router>
		</AuthProvider>
	);
}

export default App;
