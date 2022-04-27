import React, { useContext, useId, useEffect } from 'react';

import  AppContext  from '../../Context/AppContext';

function SortBy() {
	const {sortBy, setSortBy} = useContext(AppContext);

	function handleSortChange(e) {
		 setSortBy({...sortBy, sortDirection: e.target.value});
		 console.log(()=>{return sortBy})
	}




	return (
		<div className='py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded'>
			<p>Sort By:</p>
			<select
				value={sortBy.sortDirection}
				// aria-label='select'
				className='focus:text-indigo-600 focus:outline-none bg-transparent ml-1'
				onChange={handleSortChange}
			>
				<option
					className='text-sm text-indigo-800'
					key={useId() + 'newest'}
					value='Descending'
				>
					Newest
				</option>
				<option
					className='text-sm text-indigo-800'
					key={useId() + 'oldest'}
					value='Ascending'
				>
					Oldest
				</option>
			</select>
		</div>
	);
}

export default SortBy;
