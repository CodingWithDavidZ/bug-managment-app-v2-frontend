// import './App.css';
import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Pages/Header';
import ViewBug from './Pages/ViewBug/ViewBug';
import Home from './Pages/Home/Home';
import AppContext from './Context/AppContext';
import AuthContainer from './Auth/AuthContainer';
import { ErrorBoundary, useErrorHandler } from 'react-error-boundary';
import ErrorFallback from './Components/ErrorFallback';
import { useQuery } from 'react-query';

function App() {
	const { user, setUser, sortBy } = useContext(AppContext);
	const handleError = useErrorHandler();

	const allBugs = useQuery(['allBugs', sortBy], () =>
		//This serves as a pre-fetch to make the app run smoother and thus is not called at this stage
		fetch(`https://tranquil-depths-19820.herokuapp.com/bugs/sortOrder`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				sortDirection: sortBy.sortDirection,
				sortFilter: sortBy.sortFilter,
			}),
		}).then((res) => {
			const result = res.json();
			return result;
		})
	);

	const allUsers = useQuery('allUser', () =>
		fetch(`https://tranquil-depths-19820.herokuapp.com/users`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((res) => {
			const result = res.json();
			return result;
		})
	);

	useEffect(() => {
		// auto-login
		fetch(`https://tranquil-depths-19820.herokuapp.com/me`, {
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

	const errorHandler = (error, info) => {
		console.log('ERROR: ', error, 'INFO: ', info);
	};

	return (
		<div>
			<Router>
				<ErrorBoundary FallbackComponent={ErrorFallback} onError={errorHandler}>
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
