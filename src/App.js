import './App.css';
import React, { useState, useEffect } from 'react';
import AuthContainer from './Auth/AuthContainer';
import Header from './Pages/Header';
import { UserContext } from './Context/UserContext';
import Home from './Pages/Home';

function App() {
	const [user, setUser] = useState({});

	useEffect(() => {
		// auto-login
		fetch(`http://localhost:3000/me`).then((r) => {
			if (r.ok) {
				r.json().then((user) => setUser(user));
			}
		});
	}, []);

	return (
		<div>
			<UserContext.Provider value={[user, setUser]}>
				<Header />
				{user.id ? <Home /> : <AuthContainer />}
			</UserContext.Provider>
		</div>
	);
}

export default App;
