import { createContext, useState, useMemo } from 'react';

const AppContext = createContext();
export function AppProvider({ children }) {
	const [user, setUser] = useState({});
	const [sortBy, setSortBy] = useState({
		sortDirection: 'Descending',
		sortFilter: 'all',
	});
	const [selectedBugId, setSelectedBugId] = useState();
	const [bugInStorage, setBugInStorage] = useState(
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
	const [lastState, setLastState] = useState('all');

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
		allUsers,
		setAllUsers,
		setSelectedBugId,
		selectedBugId,
		bugInStorage,
		setBugInStorage,
		lastState,
		setLastState,
	}));

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppContext;
