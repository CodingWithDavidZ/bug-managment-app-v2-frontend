import { createContext, useState, useEffect, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';


const AppContext = createContext();
export function AppProvider({ children }) {
	const queryClient = useQueryClient();
	const [user, setUser] = useState({});
	const [sortBy, setSortBy] = useState({
		sortDirection: 'Descending',
		sortFilter: 'all',
	});
	const [selectedBugId, setSelectedBugId] = useState();
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
	const bugInStorage = JSON.parse(window.localStorage.getItem('bug'));

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

	function  bugsFetch() {
		fetch(`http://localhost:3000/bugs/sortOrder`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				sortDirection: sortBy.sortDirection,
				sortFilter: sortBy.sortFilter,
			}),
		}).then((r) => {
			if (r.ok) {
				r.json().then((bugs) => {
					setBugs(bugs);
				});
			}
		});
	}
	

	

	const value = useMemo(() => ({
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
		queryClient,
		bugsFetch,
		setSelectedBugId,
		selectedBugId,
		bugInStorage,
	}));

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppContext;
