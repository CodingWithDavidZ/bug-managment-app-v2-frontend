import React, { useState } from 'react';

function ModifyBug({ rawProgress }) {
	const [progressBar, setProgressBar] = useState(rawProgress);
	const [updateInfo, setUpdateInfo] = useState({
		issue_title: '',
		issue_description: '',
		assigned_to: '',
		progress: progressBar,
		status: '',
		status_modified_date: '',
		priority: '',
		image_url: '',
		approved: false,
		approved_by: '',
		resolution_summary: '',
		modified_by: '',
		actual_resolution_date: '',
	});

	const handleDelete = () => {
		console.log('delete');
	};

	const handleUpdate = () => {
		console.log('update');
	};

	const handleProgressChange = (e) => {
		setProgressBar(e.target.valueAsNumber);
	};

	return (
		<div className=''>
			<form className=''>
				<div className='container mx-auto w-11/12 md:w-2/3 max-w-lg '>
					<label className='py-1'>Title: </label>
					<input className='py-1' placeholder='Update Title' />
					<br />
					<label className='py-1'>Description: </label>
					<input className='py-1' placeholder='Update Description' />
					<br />
					<label className='py-1'>Assign: </label>
					<input className='py-1' placeholder='Assign To User' />
					<label className='py-1'>Progress: </label>
					<input
						className='py-1'
						type='range'
						min='0'
						max='10'
						value={progressBar}
						placeholder='Update Progress'
						onChange={handleProgressChange}
					/>
					<label className='py-1'>Status: </label>
					<input className='py-1' placeholder='Update Status' />
					<label className='py-1'>Priority: </label>
					<input className='py-1' placeholder='Update Priority' />
					<br />
					<label className='py-1'>Image URL: </label>
					<input type='url' placeholder='Add Image URL' />
					<br />
					<div className='hidden'>
						<label className='py-1'>Approved? </label>
						<input className='py-1' type='checkbox' />
					</div>
					<div className='hidden'>
						<label className='py-1'>Resolution Summary</label>
						<textarea
							className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
							id='exampleFormControlTextarea1'
							value=''
							rows='3'
							placeholder='Detailed Explanation of Bug'
						/>
					</div>
					<div className='grid grid-cols-3'>
						<div className='focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-center px-6 py-3 bg-indigo-700 hover:bg-green-600 focus:outline-none rounded'>
							<button className='text-sm font-medium leading-none text-white'>
								Submit
							</button>
						</div>
						<div className='col-start-3 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-center px-6 py-3 bg-indigo-700 hover:bg-red-600 focus:outline-none rounded'>
							<button
								className='text-sm font-medium leading-none text-white'
								type='button'
								oncClick={handleDelete}
							>
								Delete Bug
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}

export default ModifyBug;
