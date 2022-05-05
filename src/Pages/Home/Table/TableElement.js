import React, { useId } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiLink } from 'react-icons/bi';
import { BsTagsFill, BsCalendarDate } from 'react-icons/bs';
import { MdOutlineUpdate } from 'react-icons/md';
import { AiOutlineComment } from 'react-icons/ai';
import DateFormat from '../../../Components/DateFormat';

function TableElement({ bug }) {
	const navigate = useNavigate();

	let key = useId();

	const handleViewClick = (e) => {
		e.preventDefault();
		window.localStorage.setItem('bug', e.target.id);
		navigate(`viewBug`);
	};

	return (
		<>
			<tr
				tabIndex='0'
				className='focus:outline-none h-16 border border-gray-100 rounded'
				id={bug.id}
				key={key + bug.id + 'tr'}
			>
				{/* //idea: to add a select check box */}
				{/* <td id={bug.id} key={key + bug.id + 'td 1'}>
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
				</td> */}
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

						{bug.image_url !== '' ? (
							<BiLink key={key + bug.id + 'emoji'} />
						) : null}
					</div>
				</td>
				<td className='pl-10' id={bug.id} key={key + bug.id + 'td 3'}>
					<div
						className='flex items-center'
						id={bug.id}
						key={key + bug.id + 'div 5'}
					>
						{bug.priority === 'Critical' ? (
							<BsTagsFill
								className='text-red-800'
								key={key + bug.id + 'emoji'}
							/>
						) : bug.priority === 'Urgent' ? (
							<BsTagsFill
								className='text-orange-500'
								key={key + bug.id + 'emoji'}
							/>
						) : (
							<BsTagsFill
								className='text-green-700'
								key={key + bug.id + 'emoji'}
							/>
						)}
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
							<DateFormat time={bug.created_at} />
							{/* {bugDate(bug.created_at)} */}
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

						<p
							className='text-sm leading-none text-gray-600 ml-2'
							key={key + bug.id + 'updated_at'}
							id={bug.id}
						>
							<DateFormat time={bug.updated_at} />
						</p>
					</div>
				</td>
				<td className='pl-5 ' key={key + bug.id + 'td-7'} id={bug.id}>
					<div
						className='py-3 px-3 text-sm focus:outline-none leading-none rounded flex justify-center'
						key={key + bug.id + 'target resolution date'}
						id={bug.id}
					>
						{bug.target_resolution_date !== null
							? bug.target_resolution_date
							: 'N/A'}
					</div>
				</td>
				<td className='pl-4' key={key + bug.id + 'td-8'} id={bug.id}>
					<button
						className='focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none'
						key={key + bug.id + 'view'}
						id={bug.id}
						onClick={handleViewClick}
					>
						View
					</button>
				</td>
				<td id={bug.id}>
					<div
						className='relative px-5 pt-2 flex items-center justify-center w-full'
						key={key + bug.id + 'td-9'}
						id={bug.id}
					>
						<div
							className='text-md'
							key={key + bug.id + 'table drop down'}
							id={bug.id}
						>
							{bug.status}
						</div>
					</div>
				</td>
			</tr>
		</>
	);
}

export default TableElement;
