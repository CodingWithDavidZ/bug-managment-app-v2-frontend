import React, { useId, useContext, useEffect } from 'react';
import {  BiLink } from 'react-icons/bi';
import { BsTagsFill } from 'react-icons/bs';
import { BsCalendarDate } from 'react-icons/bs';
import { AiOutlineComment } from 'react-icons/ai';
import { MdOutlineUpdate } from 'react-icons/md';


function TableElement(bug) {
	let key = useId();

	const thisYear = new Date().getFullYear();
	const thisMonth = new Date().getMonth();
	const thisDay = new Date().getDate();

	function bugDate(time) {
		let bugDateFull = time.split('T')[0];
		let bugYear = time.split('-')[0];
		let bugMonth = time.split('-')[1];
		let bugDay = bugDateFull.split('-')[2];

		if (bugYear == thisYear && bugMonth == thisMonth && bugDay == thisDay) {
			return 'Today';
		} else if (bugYear == thisYear) {
			return `${bugMonth}/${bugDay}`;
		} else {
			return `${bugMonth}/${bugDay}/${bugYear}`;
		}
	}

	return (
		<>
			<tr
				tabIndex='0'
				className='focus:outline-none h-16 border border-gray-100 rounded'
				id={bug.bug.id}
				key={key + bug.bug.id + 'tr'}
			>
				<td id={bug.bug.id} key={key + bug.bug.id + 'td 1'}>
					<div
						className='ml-5'
						key={key + bug.bug.id + 'div 1'}
						id={bug.bug.id}
					>
						<div
							className='bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative'
							id={bug.bug.id}
							key={key + bug.bug.id + 'div 2'}
						>
							<input
								placeholder='checkbox'
								type='checkbox'
								id={bug.bug.id}
								key={key + bug.bug.id + 'input 1'}
								className='focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full'
							/>
							<div
								className='check-icon hidden bg-indigo-700 text-white rounded-sm'
								id={bug.bug.id}
								key={key + bug.bug.id + 'div 3'}
							></div>
						</div>
					</div>
				</td>
				<td className='' id={bug.bug.id} key={key + bug.bug.id + 'td 2'}>
					<div
						className='flex items-center pl-5'
						id={bug.bug.id}
						key={key + bug.bug.id + 'div 4'}
					>
						<p
							className='text-base font-medium leading-none text-gray-700 mr-2'
							id={bug.bug.id}
							key={key + bug.bug.id + 'p 1'}
						>
							{bug.bug.issue_title}
						</p>
						{/* TODO: add a turnary to show the link icon if an image url exists */}
						<BiLink key={key + bug.bug.id + 'emoji'} />
					</div>
				</td>
				<td className='pl-10' id={bug.bug.id} key={key + bug.bug.id + 'td 3'}>
					<div
						className='flex items-center'
						id={bug.bug.id}
						key={key + bug.bug.id + 'div 5'}
					>
						{/* TODO: change color of class name based on urgency */}
						<BsTagsFill
							className='text-red-700'
							key={key + bug.bug.id + 'emoji'}
						/>
						<p
							className='text-sm leading-none text-gray-600 ml-2'
							id={bug.bug.id}
							key={key + bug.bug.id + 'p 2'}
						>
							{bug.bug.priority}
						</p>
					</div>
				</td>
				<td className='pl-5' id={bug.bug.id} key={key + bug.bug.id + 'td 4'}>
					<div
						className='flex items-center'
						id={bug.bug.id}
						key={key + bug.bug.id + 'div 6'}
					>
						<BsCalendarDate key={key + bug.bug.id + 'emoji calendar'} />

						<p
							className='text-sm leading-none text-gray-600 ml-2'
							id={bug.bug.id}
							key={key + bug.bug.id + 'p 3'}
						>
							{bugDate(bug.bug.created_at)}
						</p>
					</div>
				</td>
				<td className='pl-5' id={bug.bug.id} key={key + bug.bug.id + 'td 5'}>
					<div
						className='flex items-center'
						id={bug.bug.id}
						key={key + bug.bug.id + 'div 7'}
					>
						<AiOutlineComment
							className='text-xl'
							key={key + bug.bug.id + 'emoji comment'}
						/>

						<p
							className='text-sm leading-none text-gray-600 ml-2'
							id={bug.bug.id}
							key={key + bug.bug.id + 'p 4'}
						>
							{bug.bug.comments.length}
						</p>
					</div>
				</td>
				<td className='pl-5' key={key + bug.bug.id + 'td-6'} id={bug.bug.id}>
					<div
						className='flex items-center'
						key={key + bug.bug.id + 'div-6'}
						id={bug.bug.id}
					>
						<MdOutlineUpdate
							className='text-lg'
							key={key + bug.bug.id + 'updated_icon'}
						/>
						{/* Following info should be for Last updated */}
						<p
							className='text-sm leading-none text-gray-600 ml-2'
							key={key + bug.bug.id + 'updated_at'}
							id={bug.bug.id}
						>
							{bugDate(bug.bug.updated_at)}
						</p>
					</div>
				</td>
				<td className='pl-5 ' key={key + bug.bug.id + 'td-7'} id={bug.bug.id}>
					<div
						className='py-3 px-3 text-sm focus:outline-none leading-none text-red-700 bg-red-100 rounded'
						key={key + bug.bug.id + 'target resolution date'}
						id={bug.bug.id}
					>
						{bug.bug.target_resolution_date}
					</div>
				</td>
				<td className='pl-4' key={key + bug.bug.id + 'td-8'} id={bug.bug.id}>
					<button
						className='focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none'
						key={key + bug.bug.id + 'view'}
						id={bug.bug.id}
					>
						View
					</button>
				</td>
				<td id={bug.bug.id}>
					<div
						className='relative px-5 pt-2'
						key={key + bug.bug.id + 'td-9'}
						id={bug.bug.id}
					>
						<div
							className='text-md'
							key={key + bug.bug.id + 'table drop down'}
							id={bug.bug.id}
						>{bug.bug.status}</div>
					</div>
				</td>
			</tr>
		</>
	);
}

export default TableElement;
