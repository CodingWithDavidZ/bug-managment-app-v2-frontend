import React, { useId } from 'react';

function TableDropdownButton() {
	return (
		<div className='relative inline-flex' key={useId()}>
			<select
				className=' rounded-full text-gray-600 cursor-pointer bg-white hover:border-gray-400 focus:outline-none appearance-none'
				key={useId()}
			>
				<option key={useId() + 'status'}>Status</option>
				<option key={useId() + 'open'} value='open'>
					Open
				</option>
				<option key={useId() + 'close'} value='close'>
					Close
				</option>
				<option key={useId() + 'noReplicate'} value='noReplicate'>
					Cannot Replicate
				</option>
			</select>
		</div>
	);
}

export default TableDropdownButton;
