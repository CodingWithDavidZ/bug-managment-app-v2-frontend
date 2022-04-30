// import './App.css';
import React, { useEffect, useContext, useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Pages/Header';
import ViewBug from './Pages/ViewBug/ViewBug';
import Home from './Pages/Home/Home';
import AppContext from './Context/AppContext';
import AuthContainer from './Auth/AuthContainer';
import Breadcrumbs from './Components/Breadcrumbs';
import routes from './Utilities/routes';
import {ErrorBoundary, useErrorHandler} from 'react-error-boundary';
import ErrorFallback from './Components/ErrorFallback';




function App() {
	const { user, setUser, setBug, setAllUsers, bug, allUsers, frogallUsers } = useContext(AppContext);
	// const [allUsers, setAllUsers] = useState([]);

	

	

	const handleError = useErrorHandler();

	useEffect(() => {
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
	}, [setUser]);

	// useEffect(() => {
	// 	fetch(`http://localhost:3000/users`, {
	// 		method: 'GET',
	// 		credentials: 'include',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 	}).then((r) => {
	// 		if (r.ok) {
	// 			r.json().then((users) => {
	// 				setAllUsers(users);
	// 			});
	// 		}
	// 	});
	// }, [setAllUsers]);

	// useEffect(() => {
	// 	setAllUsers(JSON.parse(window.localStorage.getItem('count')));
	// }, []);

	// useEffect(() => {
	// 	localStorage.setItem('allUsers', JSON.stringify(allUsers));
	// }, [allUsers]);
	const errorHandler = (error, info) => {
		console.log('ERROR: ',error,'INFO: ', info);
	};

	// const resetState = ()=>{
	// 	setBug(JSON.parse(window.localStorage.getItem('bug')));
	// 	setAllUsers(JSON.parse(window.localStorage.getItem('allUsers')))
	// }

	return (
		<div>
				<Router>
			<ErrorBoundary FallbackComponent={ErrorFallback} onError={errorHandler} >
					<Header />
					<Routes>
						<Route path='/'>
							<Route index element={user.id ? <Home /> : <AuthContainer />} />

							<Route exact path='viewBug' element={<ViewBug />} />
						</Route>
					</Routes>
			</ErrorBoundary>
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
