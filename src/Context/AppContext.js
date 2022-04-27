import { createContext, useState, useEffect } from 'react';

const AppContext = createContext();
export function AppProvider({ children }) {
	const [user, setUser] = useState({});
	const [sortBy, setSortBy] = useState({
		sortDirection: 'Descending',
		sortFilter: 'all',
	});
	const [bug, setBug] = useState(
		JSON.parse(window.localStorage.getItem('bug'))
	);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedBug, setSelectedBug] = useState();
	const [bugs, setBugs] = useState([]);
	const [bugStatusSort, setBugStatusSort] = useState('');
	const [bugSortOrder, setBugSortOrder] = useState([]);
	const [allUsers, setAllUsers] = useState(
		JSON.parse(window.localStorage.getItem('allUsers'))
	);

	useEffect(() => {
		console.log('fetched allUsers');
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
	}, [setAllUsers]);
	
	useEffect(() => {
		console.log('Saved allUsers to localStorage');
		localStorage.setItem('allUsers', JSON.stringify(allUsers));
	}, [allUsers]);	

	useEffect(() => {
		console.log('Pulled allUsers from localStorage');
		setAllUsers(JSON.parse(window.localStorage.getItem('allUsers')));
	}, []);

	useEffect(() => {
		localStorage.setItem("bug", JSON.stringify(bug));
		console.log('Saved bug to localStorage');
	}, [bug]);

	useEffect(() => {
		setBug(JSON.parse(window.localStorage.getItem('bug')));
		console.log('Pulled bug from localStorage');
	}, []);

	

	const value = {
		user,
		setUser,
		bugs,
		setBugs,
		sortBy,
		setSortBy,
		bugStatusSort,
		setBugStatusSort,
		bugSortOrder,
		setBugSortOrder,
		selectedBug,
		setSelectedBug,
		isLoading,
		setIsLoading,
		bug,
		setBug,
		allUsers,
		setAllUsers,
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppContext;
