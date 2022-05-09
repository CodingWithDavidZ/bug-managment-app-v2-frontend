import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../../Context/AppContext';

function StatusFilter() {
	
	const isHighlighted = 'py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full';
	const notHighlighted =
		'py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full';
	const { setBugStatusSort, setSortBy, sortBy, lastState, setLastState } = useContext(AppContext);
	const [allStyle, setAllStyle] = useState();
	const [completedStyle, setCompletedStyle] = useState();
	const [inProgressStyle, setInProgressStyle] = useState();
	const [onHoldStyle, setOnHoldStyle] = useState();
	const [needsApprovalStyle, setNeedsApprovalStyle] = useState();
	

	

	function renderStyleSwitch(param) {
		setLastState(param);
		switch (param) { //Changes classNames and sets the sortBy state
			case 'all':
				setAllStyle(isHighlighted);
				setCompletedStyle(notHighlighted);
				setInProgressStyle(notHighlighted);
				setOnHoldStyle(notHighlighted);
				setNeedsApprovalStyle(notHighlighted);
				setBugStatusSort('all');
				setSortBy({...sortBy, sortFilter: 'all'});
				break;
			case 'completed':
				setAllStyle(notHighlighted);
				setCompletedStyle(isHighlighted);
				setInProgressStyle(notHighlighted);
				setOnHoldStyle(notHighlighted);
				setNeedsApprovalStyle(notHighlighted);
				setBugStatusSort('completed');
				setSortBy({...sortBy, sortFilter: 'completed'});
				break;
			case 'inProgress':
				setAllStyle(notHighlighted);
				setCompletedStyle(notHighlighted);
				setInProgressStyle(isHighlighted);
				setOnHoldStyle(notHighlighted);
				setNeedsApprovalStyle(notHighlighted);
				setBugStatusSort('inProgress');
				setSortBy({...sortBy, sortFilter: 'inProgress'});
				break;
			case 'onHold':
				setAllStyle(notHighlighted);
				setCompletedStyle(notHighlighted);
				setInProgressStyle(notHighlighted);
				setOnHoldStyle(isHighlighted);
				setNeedsApprovalStyle(notHighlighted);
				setBugStatusSort('onHold');
				setSortBy({...sortBy, sortFilter: 'waiting'});
				break;
			case 'needsApproval':
				setAllStyle(notHighlighted);
				setCompletedStyle(notHighlighted);
				setInProgressStyle(notHighlighted);
				setOnHoldStyle(notHighlighted);
				setNeedsApprovalStyle(isHighlighted);
				setBugStatusSort('needsApproval');
				setSortBy({...sortBy, sortFilter: 'needsApproval'});
				break;
			default:
				setAllStyle(isHighlighted);
				setCompletedStyle(notHighlighted);
				setInProgressStyle(notHighlighted);
				setOnHoldStyle(notHighlighted);
				setNeedsApprovalStyle(notHighlighted);
				setBugStatusSort('all');
				setSortBy({...sortBy, sortFilter: 'all'});
		}
	}	

	useEffect(() => {
			renderStyleSwitch(lastState);
	}, []);




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
			<div
				className='rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8'
				value='onHold'
			>
				<div
					className={onHoldStyle}
					value='onHold'
					onClick={() => renderStyleSwitch('onHold')}
				>
					<p value='onHold'>On Hold</p>
				</div>
			</div>
			<div
				className='rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8'
				value='needsApproval'
			>
				<div
					className={needsApprovalStyle}
					value='needsApproval'
					onClick={() => renderStyleSwitch('needsApproval')}
				>
					<p value='needsApproval'>Needs Approval</p>
				</div>
			</div>
		</div>
	);
}

export default StatusFilter;
