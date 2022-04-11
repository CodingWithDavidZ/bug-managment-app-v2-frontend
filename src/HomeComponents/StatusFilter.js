import React, { useContext, useState } from 'react';
import { useParams } from 'react-router';
import { BugStatusSortContext } from '../Context/BugStatusSortContext';

function StatusFilter() {
	const isHighlighted = 'py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full';
	const notHighlighted =
		'py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full';

	const [bugStatusSort, setBugStatusSort] = useContext(BugStatusSortContext);
	const [allStyle, setAllStyle] = useState(isHighlighted);
	const [completedStyle, setCompletedStyle] = useState(notHighlighted);
	const [inProgressStyle, setInProgressStyle] = useState(notHighlighted);

	function renderStyleSwitch(param) {
		switch (param) {
			case 'all':
				setAllStyle(isHighlighted);
				setCompletedStyle(notHighlighted);
				setInProgressStyle(notHighlighted);
				setBugStatusSort('all');
				break;
			case 'completed':
				setAllStyle(notHighlighted);
				setCompletedStyle(isHighlighted);
				setInProgressStyle(notHighlighted);
				setBugStatusSort('completed');
				break;
			case 'inProgress':
				setAllStyle(notHighlighted);
				setCompletedStyle(notHighlighted);
				setInProgressStyle(isHighlighted);
				setBugStatusSort('inProgress');
				break;
			default:
				setAllStyle(isHighlighted);
				setCompletedStyle(notHighlighted);
				setInProgressStyle(notHighlighted);
				setBugStatusSort('all');
		}
	}

	return (
		<div className='flex items-center'>
			<div
				className='rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800'
				value='all'
			>
				<div
					className={allStyle}
					value='all'
					onClick={() => renderStyleSwitch('all')}
				>
					<p>All</p>
				</div>
			</div>
			<div
				className='rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8'
				value='completed'
			>
				<div
					className={completedStyle}
					value='completed'
					onClick={() => renderStyleSwitch('completed')}
				>
					<p value='completed'>Completed</p>
				</div>
			</div>
			<div
				className='rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8'
				value='in-progress'
				onClick={() => renderStyleSwitch('inProgress')}
			>
				<div className={inProgressStyle} value='in-progress'>
					<p>In-Progress</p>
				</div>
			</div>
		</div>
	);
}

export default StatusFilter;
