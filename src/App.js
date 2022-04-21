import './App.css';
import React, { useEffect, useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthContainer from './Auth/AuthContainer';
import Header from './Pages/Header';
import ViewBugContainer from './Pages/ViewBug/ViewBugContainer';
import Home from './Pages/Home/Home';
import AppContext from './Context/AppContext';
import Loading from './Components/Loading';

function App() {
	const { user, setUser, isLoading } = useContext(AppContext);

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

	return (
		<div>
			<Router>
			<Header />
				<Routes>
					<Route>
						<Route exact path='/' element={<Home />} />

						<Route exact path='viewBug' element={<ViewBugContainer />} />
					</Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
