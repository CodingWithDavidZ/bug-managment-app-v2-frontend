import React, { useId, useContext, useEffect } from 'react';
import TableElement from './TableElement';
import AppContext from '../../../Context/AppContext';
import SortBy from '../SortBy';
import { useQuery } from 'react-query';

function TableFramework() {
	//responsible for holding state and rendering table
	const { setBugs, sortBy } = useContext(AppContext);

	
	const bugs = useQuery(['allBugs', sortBy], () =>
		fetch(`http://localhost:3000/bugs/sortOrder`, {
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

	
	// function getAllUsers() {
	// 	if (allUsers === [] || allUsers === undefined) {
	// 	fetch(`http://localhost:3000/users`, {
	// 		method: 'GET',
	// 		credentials: 'include',
	// 		headers: {
	// 			'Content-Type': 'application/json'},
	// 			}).then((r) => {
	// 				if (r.ok) {
	// 					r.json().then((users) => {
	// 				setAllUsers(users);
	// 			});
	// 		}
	// 	});
	// }
	// }

	// getAllUsers();



	if(bugs.isLoading) {
		return <div>Loading...</div>
	}
				


	const renderBugs = () => {
		
		return bugs.data.map((bug) => {
			return <TableElement key={bug.id} bug={bug} bugs={bugs.data}/>;
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
