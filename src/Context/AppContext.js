import { createContext, useState, useEffect } from 'react';

const AppContext = createContext();
export function AppProvider({ children }) {
	const [user, setUser] = useState({});
	const [sortBy, setSortBy] = useState('newest');
	const [bugs, setBugs] = useState([]);
	const [bugStatusSort, setBugStatusSort] = useState('');
	const [bugSortOrder, setBugSortOrder] = useState([]);

	



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
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppContext;
