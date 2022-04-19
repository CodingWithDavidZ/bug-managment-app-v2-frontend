import './App.css';
import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthContainer from './Auth/AuthContainer';
import Header from './Pages/Header';

import Home from './Pages/Home/Home';
import AppContext from './Context/AppContext';

function App() {
	const { user, setUser, setBugs, setBugsReversed, bugs } =
		useContext(AppContext);

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
	}, []);

	// useEffect(() => {
	// 	fetch(`http://localhost:3000/bugs`, {
	// 		method: 'GET',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 	}).then((r) => {
	// 		if (r.ok) {
	// 			// setBugs and setBugsReversed
	// 			r.json().then((bugs) => {
	// 				setBugs(bugs);
	// 			});
	// 		}
	// 	});
	// }, []);


	return (
		<div>
			<Header />
			<Router>
				<Routes>
					<Route
						exact
						path='/'
						element={user.id ? <Home /> : <AuthContainer />}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
