import { createContext, useState, useEffect } from 'react';

const AppContext = createContext();
export function AppProvider({ children }) {
	const [user, setUser] = useState({});
	const [sortBy, setSortBy] = useState({
		sortDirection: 'Descending',
		sortFilter: 'all',
	});
	const [bug, setBug] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedBug, setSelectedBug] = useState();
	const [bugs, setBugs] = useState([]);
	const [bugStatusSort, setBugStatusSort] = useState('');
	const [bugSortOrder, setBugSortOrder] = useState([]);
	const [allUsers, setAllUsers] = useState([]);

	let localBugId = localStorage.getItem('bugId');

	useEffect(() => {
		setSelectedBug(localStorage.getItem('bugId'));
	}, [localBugId]);

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
