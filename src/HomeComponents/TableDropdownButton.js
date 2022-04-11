import React, { useState } from 'react';

function TableDropdownButton() {
	return (
		<div className='relative inline-flex'>
			<select className=' rounded-full text-gray-600 cursor-pointer bg-white hover:border-gray-400 focus:outline-none appearance-none'>
				<option>Status</option>
				<option value='open'>Open</option>
				<option value='close'>Close</option>
				<option value='noReplicate'>Cannot Replicate</option>
			</select>
		</div>
	);
}

export default TableDropdownButton;
