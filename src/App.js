// import './App.css';
import React, { useEffect, useContext, useState, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Pages/Header';
import ViewBug from './Pages/ViewBug/ViewBug';
import Home from './Pages/Home/Home';
import AppContext from './Context/AppContext';
import AuthContainer from './Auth/AuthContainer';
import Breadcrumbs from './Components/Breadcrumbs';
import routes from './Utilities/routes';

function App() {
	const { user, setUser, isLoading } = useContext(AppContext);
	const [allUsers, setAllUsers] = useState([]);

	useMemo(() => {
		// auto-login
		fetch(`http://localhost:3000/me`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((r) => {
			if (r.ok) {
				r.json().then((user) => setUser(user));
			}
		});
	}, []);

	useMemo(() => {
		const helper = allUsers
		fetch(`http://localhost:3000/users`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((r) => {
			if (r.ok) {
				r.json().then((users) => {
					setAllUsers(users);
				});
			}
		});
	}, []);

	return (
		<div>
			<Router>
				<Header />
				<Routes>
					<Route
						exact
						path='/'
						element={user.id ? <Home /> : <AuthContainer />}
					/>

					<Route
						exact
						path='viewBug'
						element={<ViewBug allUsers={allUsers} setAllUsers={setAllUsers} />}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;

// idea: try to implement this breadcrumb thing
// {
// 	routes.map(({ path, name, Component }, key) => (
// 		<Route
// 			exact
// 			path={path}
// 			key={key}
// 			return={(props) => {
// 				const crumbs = routes
// 					// Get all routes that contain the current one.
// 					.filter(({ path }) => props.match.path.includes(path))
// 					// Swap out any dynamic routes with their param values.
// 					// E.g. "/pizza/:pizzaId" will become "/pizza/1"
// 					.map(({ path, ...rest }) => ({
// 						path: Object.keys(props.match.params).length
// 							? Object.keys(props.match.params).reduce(
// 									(path, param) =>
// 										path.replace(`:${param}`, props.match.params[param]),
// 									path
// 							  )
// 							: path,
// 						...rest,
// 					}));

// 				console.log(`Generated crumbs for ${props.match.path}`);
// 				crumbs.map(({ name, path }) => console.log({ name, path }));

// 				return (
// 					<div className='p-8'>
// 						<Breadcrumbs crumbs={crumbs} />
// 						<Component {...props} />
// 					</div>
// 				);
// 			}}
// 		/>
// 	));
// }
