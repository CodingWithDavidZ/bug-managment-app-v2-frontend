import React, { useId, useContext, useEffect } from 'react';
import TableElement from './TableElement';
import AppContext from '../../../Context/AppContext';
import SortBy from '../SortBy';

function TableFramework() {
	//responsible for holding state and rendering table
	const { bugs, setBugs, sortBy, setAllUsers } = useContext(AppContext);

	
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

	useEffect(() => {
		fetch(`http://localhost:3000/users`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'},
				}).then((r) => {
					if (r.ok) {
						r.json().then((users) => {
					setAllUsers(users);
				});
			}
		});
	}, []);

			


	const renderBugs = () => {
		return bugs.map((bug) => {
			return <TableElement key={bug.id} bug={bug}/>;
		});
	};



	return (
		<div className='mt-7 overflow-x-auto' key={useId()}>
			<table className='w-full whitespace-nowrap' key={useId()}>
				<tbody key={useId()}>
					{renderBugs()}
					<tr className='h-3' key={useId()}></tr>
				</tbody>
			</table>
		</div>
	);
}

export default TableFramework;
