import React, { useId, useContext, useEffect } from 'react';
import TableDropdownButton from './TableDropdownButton';
import { BiBug, BiLink } from 'react-icons/bi';
import { BsTagsFill } from 'react-icons/bs';
import { BsCalendarDate } from 'react-icons/bs';
import { AiOutlineComment } from 'react-icons/ai';
import { MdOutlineUpdate } from 'react-icons/md';
import AppContext from '../../../Context/AppContext';

function TableElement() {
	const { bugSortOrder, sortBy, bugs, setBugSortOrder } =
		useContext(AppContext);

	let key = useId();

	const thisYear = new Date().getFullYear();
	const thisMonth = new Date().getMonth();
	const thisDay = new Date().getDate();

	switch (sortBy) {
		case 'newest':
			setBugSortOrder(() => {
				return bugs;
			});
			break;
		case 'oldest':
			setBugSortOrder(() => {
				return bugs.reverse();
			});
			break;
		default:
			setBugSortOrder(bugs);
			break;
	}
	console.log('bugSortOrder', bugSortOrder[0]);

	// let sortOrder = (sortBy === 'newest') ? bugs : bugs.reverse();

	const tableData = bugSortOrder.map((bug) => {
		return (
			<tr
				tabIndex='0'
				className='focus:outline-none h-16 border border-gray-100 rounded'
				id={bug.id}
				key={key + bug.id + 'tr'}
			>
				<td id={bug.id} key={key + bug.id + 'td 1'}>
					<div className='ml-5' key={key + bug.id + 'div 1'} id={bug.id}>
						<div
							className='bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative'
							id={bug.id}
							key={key + bug.id + 'div 2'}
						>
							<input
								placeholder='checkbox'
								type='checkbox'
								id={bug.id}
								key={key + bug.id + 'input 1'}
								className='focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full'
							/>
							<div
								className='check-icon hidden bg-indigo-700 text-white rounded-sm'
								id={bug.id}
								key={key + bug.id + 'div 3'}
							></div>
						</div>
					</div>
				</td>
				<td className='' id={bug.id} key={key + bug.id + 'td 2'}>
					<div
						className='flex items-center pl-5'
						id={bug.id}
						key={key + bug.id + 'div 4'}
					>
						<p
							className='text-base font-medium leading-none text-gray-700 mr-2'
							id={bug.id}
							key={key + bug.id + 'p 1'}
						>
							{bug.issue_title}
						</p>
						{/* TODO: add a turnary to show the link icon if an image url exists */}
						<BiLink key={key + bug.id + 'emoji'} />
					</div>
				</td>
				<td className='pl-10' id={bug.id} key={key + bug.id + 'td 3'}>
					<div
						className='flex items-center'
						id={bug.id}
						key={key + bug.id + 'div 5'}
					>
						{/* TODO: change color of class name based on urgency */}
						<BsTagsFill className='text-red-700' key={key + bug.id + 'emoji'} />
						<p
							className='text-sm leading-none text-gray-600 ml-2'
							id={bug.id}
							key={key + bug.id + 'p 2'}
						>
							{bug.priority}
						</p>
					</div>
				</td>
				<td className='pl-5' id={bug.id} key={key + bug.id + 'td 4'}>
					<div
						className='flex items-center'
						id={bug.id}
						key={key + bug.id + 'div 6'}
					>
						<BsCalendarDate key={key + bug.id + 'emoji calendar'} />

						<p
							className='text-sm leading-none text-gray-600 ml-2'
							id={bug.id}
							key={key + bug.id + 'p 3'}
						>
							{bug.created_at}
						</p>
					</div>
				</td>
				<td className='pl-5' id={bug.id} key={key + bug.id + 'td 5'}>
					<div
						className='flex items-center'
						id={bug.id}
						key={key + bug.id + 'div 7'}
					>
						<AiOutlineComment
							className='text-xl'
							key={key + bug.id + 'emoji comment'}
						/>

						<p
							className='text-sm leading-none text-gray-600 ml-2'
							id={bug.id}
							key={key + bug.id + 'p 4'}
						>
							{bug.comments.length}
						</p>
					</div>
				</td>
				<td className='pl-5' key={key + bug.id + 'td-6'} id={bug.id}>
					<div
						className='flex items-center'
						key={key + bug.id + 'div-6'}
						id={bug.id}
					>
						<MdOutlineUpdate
							className='text-lg'
							key={key + bug.id + 'updated_icon'}
						/>
						{/* Following info should be for Last updated */}
						<p
							className='text-sm leading-none text-gray-600 ml-2'
							key={key + bug.id + 'updated_at'}
							id={bug.id}
						>
							{bug.updated_at}
						</p>
					</div>
				</td>
				<td className='pl-5' key={key + bug.id + 'td-7'} id={bug.id}>
					<div
						className='py-3 px-3 text-sm focus:outline-none leading-none text-red-700 bg-red-100 rounded'
						key={key + bug.id + 'target resolution date'}
						id={bug.id}
					>
						{bug.target_resolution_date}
					</div>
				</td>
				<td className='pl-4' key={key + bug.id + 'td-8'} id={bug.id}>
					<button
						className='focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none'
						key={key + bug.id + 'view'}
						id={bug.id}
					>
						View
					</button>
				</td>
				<td id={bug.id}>
					<div
						className='relative px-5 pt-2'
						key={key + bug.id + 'td-9'}
						id={bug.id}
					>
						<TableDropdownButton
							key={key + bug.id + 'table drop down'}
							id={bug.id}
						/>
					</div>
				</td>
			</tr>
		);
	});

	return <>{tableData}</>;
}

export default TableElement;
