import React from 'react';
import TableElement from './TableElement';

function TableFramework() {
	return (
		<div className='mt-7 overflow-x-auto'>
			<table className='w-full whitespace-nowrap'>
				<tbody>
					<TableElement />
					<tr className='h-3'></tr>
				</tbody>
			</table>
		</div>
	);
}

export default TableFramework;
