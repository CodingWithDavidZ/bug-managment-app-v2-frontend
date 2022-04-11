import React, { useState, useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import { SortByContext } from '../Context/SortByContext';
import SortBy from '../HomeComponents/SortBy';
import AddBug from '../HomeComponents/AddBug';
import StatusFilter from '../HomeComponents/StatusFilter';
import { BugStatusSortContext } from '../Context/BugStatusSortContext';
import TableFramework from '../HomeComponents/TableFramework';

function Home() {
	const [user, setUser] = useContext(UserContext);
	const [sortBy, setSortBy] = useState();
	const [bugStatusSort, setBugStatusSort] = useState();

	console.log('MainLayout: user', user);

	function dropdownFunction(element) {
		var dropdowns = document.getElementsByClassName('dropdown-content');
		var i;
		let list =
			element.parentElement.parentElement.getElementsByClassName(
				'dropdown-content'
			)[0];
		list.classList.add('target');
		for (i = 0; i < dropdowns.length; i++) {
			if (!dropdowns[i].classList.contains('target')) {
				dropdowns[i].classList.add('hidden');
			}
		}
		list.classList.toggle('hidden');
	}

	return (
		<SortByContext.Provider value={[sortBy, setSortBy]}>
			<div className='sm:px w-full'>
				<div className='px-4 md:px-10 py-4 md:py-7'>
					{/* Top Navbar with "Sort By" dropdown */}
					<div className='flex items-center justify-between'>
						<p
							tabIndex='0'
							className='focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800'
						>
							Bugs
						</p>
						<SortBy />
					</div>
					{/* END: Top Navbar with "Sort By" dropdown */}
				</div>
				<BugStatusSortContext.Provider
					value={[bugStatusSort, setBugStatusSort]}
				>
					<div className='bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10'>
						<div className='sm:flex items-center justify-between'>
							<StatusFilter />
							<AddBug />
						</div>
					</div>
					<TableFramework />
				</BugStatusSortContext.Provider>
			</div>
		</SortByContext.Provider>
	);
}

export default Home;
