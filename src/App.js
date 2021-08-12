import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import { RegisterPage, LoginPage, TodoScreen } from './pages/';
import { NavBar } from './components/';
import { AuthProvider } from './context/auth';
import { GlobalProvider } from './context/global';
import AuthRoute from './util/AuthRoute.jsx';

function App() {
	return (
		<GlobalProvider>
			<AuthProvider>
				<Router>
					<Container>
						<NavBar />
						<AuthRoute exact path='/todos' component={TodoScreen} />
						<Route exact path='/register' component={RegisterPage} />
						<Route exact path='/login' component={LoginPage} />
					</Container>
				</Router>
			</AuthProvider>
		</GlobalProvider>
	);
}

export default App;
