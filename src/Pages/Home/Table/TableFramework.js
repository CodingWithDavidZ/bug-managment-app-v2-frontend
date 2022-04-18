import React, { useId } from 'react';
import TableElement from './TableElement';

function TableFramework() {
	return (
		<div className='mt-7 overflow-x-auto' key={useId()}>
			<table className='w-full whitespace-nowrap' key={useId()}>
				<tbody key={useId()}>
					<TableElement key={useId()} />
					<tr className='h-3' key={useId()}></tr>
				</tbody>
			</table>
		</div>
	);
}

export default TableFramework;
