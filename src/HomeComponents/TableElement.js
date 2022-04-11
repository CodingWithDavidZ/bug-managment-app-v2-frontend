import React from 'react';
import TableDropdownButton from './TableDropdownButton';
import { BiLink } from 'react-icons/bi';
import { BsTagsFill } from 'react-icons/bs';
import { BsCalendarDate } from 'react-icons/bs';
import { AiOutlineComment } from 'react-icons/ai';
import { MdOutlineUpdate } from 'react-icons/md';

function TableElement() {
	const tableData = (
		// user.tickets.map((ticket) => {
		// 	return (
		<tr
			tabIndex='0'
			className='focus:outline-none h-16 border border-gray-100 rounded'
		>
			<td>
				<div className='ml-5'>
					<div className='bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative'>
						<input
							placeholder='checkbox'
							type='checkbox'
							className='focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full'
						/>
						<div className='check-icon hidden bg-indigo-700 text-white rounded-sm'></div>
					</div>
				</div>
			</td>
			<td className=''>
				<div className='flex items-center pl-5'>
					<p className='text-base font-medium leading-none text-gray-700 mr-2'>
						Button Doesn't Work
					</p>
					{/* TODO: add a turnary to show the link icon if an image url exists */}
					<BiLink />
				</div>
			</td>
			<td className='pl-24'>
				<div className='flex items-center'>
					{/* TODO: change color of class name based on urgency */}
					<BsTagsFill className='text-red-700' />
					<p className='text-sm leading-none text-gray-600 ml-2'>Urgent</p>
				</div>
			</td>
			<td className='pl-5'>
				<div className='flex items-center'>
					<BsCalendarDate />

					<p className='text-sm leading-none text-gray-600 ml-2'>04/07</p>
				</div>
			</td>
			<td className='pl-5'>
				<div className='flex items-center'>
					<AiOutlineComment className='text-xl' />

					<p className='text-sm leading-none text-gray-600 ml-2'>23</p>
				</div>
			</td>
			<td className='pl-5'>
				<div className='flex items-center'>
					<MdOutlineUpdate className='text-lg' />
					{/* Following info should be for Last updated */}
					<p className='text-sm leading-none text-gray-600 ml-2'>04/07</p>
				</div>
			</td>
			<td className='pl-5'>
				<button className='py-3 px-3 text-sm focus:outline-none leading-none text-red-700 bg-red-100 rounded'>
					Due today at 18:00
				</button>
			</td>
			<td className='pl-4'>
				<button className='focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none'>
					View
				</button>
			</td>
			<td>
				<div className='relative px-5 pt-2'>
					<TableDropdownButton />
				</div>
			</td>
		</tr>
	);
	// 	);
	// };

	return <>{tableData}</>;
}

export default TableElement;
