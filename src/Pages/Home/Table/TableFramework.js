import React, { useId, useContext, useEffect } from 'react';
import TableElement from './TableElement';
import AppContext from '../../../Context/AppContext';
import SortBy from '../SortBy';

function TableFramework() {
	//responsible for holding state and rendering table
	const { bugs, setBugs, sortBy, setAllUsers , allUsers } = useContext(AppContext);

	
	useEffect(() => {
		fetch(`http://localhost:3000/bugs/sortOrder`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'},
			body: JSON.stringify({
				sortDirection: sortBy.sortDirection,
				sortFilter: sortBy.sortFilter,
			})
		}).then((r) => {
			if (r.ok) {
				r.json().then((bugs) => {
					setBugs(bugs);
				});
			}
		});
	}, [sortBy]);

	
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



			


	const renderBugs = () => {
		return bugs.map((bug) => {
			return <TableElement key={bug.id} bug={bug}/>;
		});
	};



	return (
		<div className='mt-7 overflow-x-auto' key={useId()}>
			<table className='w-full whitespace-nowrap' key={useId()}>
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

				<tbody key={useId()}>
					{renderBugs()}
					<tr className='h-3' key={useId()}></tr>
				</tbody>
			</table>
		</div>
	);
}

export default TableFramework;
