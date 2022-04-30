import { createContext, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import * as api from '../Api/ApiCalls';

const AppContext = createContext();
export function AppProvider({ children }) {
	const [test, setTest] = useState({});
	const [user, setUser] = useState({});
	const [sortBy, setSortBy] = useState({
		sortDirection: 'Descending',
		sortFilter: 'all',
	});
	const [bug, setBug] = useState({});
	
	const [isLoading, setIsLoading] = useState(true);
	const [selectedBug, setSelectedBug] = useState();
	const [bugs, setBugs] = useState([]);
	const [bugStatusSort, setBugStatusSort] = useState('');
	const [bugSortOrder, setBugSortOrder] = useState([]);
	// const [allUsers, setAllUsers] = useState(
	// 	JSON.parse(window.localStorage.getItem('allUsers'))
	// );

	const allUsers = useQuery('allUsers', () => api.getAllUsers());
	// const bug = useQuery('getBug', () => api.getBug());
	
	const froggetMe = useQuery('getMe', () => api.getMe());
	
	
	// useEffect(() => {
	// 	console.log('Saved allUsers to localStorage');
	// 	localStorage.setItem('allUsers', JSON.stringify(allUsers));
	// }, [allUsers]);	

	// useEffect(() => {
	// 	console.log('Pulled allUsers from localStorage');
	// 	setAllUsers(JSON.parse(window.localStorage.getItem('allUsers')));
	// }, []);

	// useEffect(() => {
	// 	localStorage.setItem("bug", JSON.stringify(bug));
	// 	console.log('Saved bug to localStorage');
	// }, [bug]);

	// useEffect(() => {
	// 	setBug(JSON.parse(window.localStorage.getItem('bug')));
	// 	console.log('Pulled bug from localStorage');
	// }, []);


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
		test,
		setTest
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppContext;
