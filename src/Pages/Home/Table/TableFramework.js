import React, { useContext } from 'react';
import TableElement from './TableElement';
import AppContext from '../../../Context/AppContext';
import { useQuery } from 'react-query';
import Loading from '../../../Components/Loading';

function TableFramework() {
	const { sortBy } = useContext(AppContext);
	const bugs = useQuery(['allBugs', sortBy], () =>
		fetch(`https://tranquil-depths-19820.herokuapp.com/bugs/sortOrder`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				sortDirection: sortBy.sortDirection,
				sortFilter: sortBy.sortFilter,
			}),
		}).then((res) => {
			const result = res.json();
			return result;
		})
	);

	if (bugs.isLoading) {
		return <Loading />;
	}

	const renderBugs = () => {
		return bugs.data.map((bug) => {
			return <TableElement key={bug.id} bug={bug} bugs={bugs.data} />;
		});
	};

	return (
		<div className='mt-7 overflow-x-auto' key={bugs.data.length}>
			<table className='w-full whitespace-nowrap' key={bugs.data.length}>
				<thead>
					<tr className='h-14 bg-indigo-100 text-indigo-500 border-gray-800 rounded'>
						{/* //idea: add a check box */}
						{/* <th>Select</th> */}
						<th>Bug Title</th>
						<th>Priority</th>
						<th>Created</th>
						<th>Messages</th>
						<th>Updated</th>
						<th>Due</th>
						<th>View</th>
						<th>Status</th>
					</tr>
				</thead>

				<tbody key={bugs.data.length}>
					{renderBugs()}
					<tr className='h-3' key={bugs.data.length}></tr>
				</tbody>
			</table>
		</div>
	);
}

export default TableFramework;
