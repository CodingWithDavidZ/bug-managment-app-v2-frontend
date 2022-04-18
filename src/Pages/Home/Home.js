import React, { useState, useContext } from 'react';
import AppContext from '../../Context/AppContext';

import SortBy from './SortBy';
import AddBugButton from './AddBugButton';
import StatusFilter from './StatusFilter';

import TableFramework from './Table/TableFramework';

function Home() {


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

			<div className='bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10'>
				<div className='sm:flex items-center justify-between'>
					<StatusFilter />
					<AddBugButton />
				</div>
			</div>
			<TableFramework />
		</div>
	);
}

export default Home;
