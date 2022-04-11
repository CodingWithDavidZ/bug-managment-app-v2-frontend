import React, { useContext } from 'react';

import { SortByContext } from '../Context/SortByContext';

function SortBy() {
	const [sortBy, setSortBy] = useContext(SortByContext);
	const options = [
		{
			value: 'newest',
			label: 'Newest',
		},
		{
			value: 'oldest',
			label: 'Oldest',
		},
	];

	function handleSortChange(e) {
		setSortBy(e.target.value);
		console.log('Sort By:', sortBy);
	}

	return (
		<div className='py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded'>
			<p>Sort By:</p>
			<select
				value={sortBy}
				// aria-label='select'
				className='focus:text-indigo-600 focus:outline-none bg-transparent ml-1'
				onChange={handleSortChange}
			>
				{options.map((option) => (
					<option className='text-sm text-indigo-800'>{option.label}</option>
				))}
			</select>
		</div>
	);
}

export default SortBy;
