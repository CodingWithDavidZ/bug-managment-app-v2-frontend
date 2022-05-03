import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../Context/AppContext';
import Dropdown from '../../Components/Dropdown';
import {useQuery, useQueryClient} from 'react-query';



function ModifyBug({ rawProgress }) {
	const { user, bugInStorage } = useContext(AppContext);
	const bugQuery = useQuery(['getBug', bugInStorage], () =>
		fetch(`http://localhost:3000/bugs/${bugInStorage}`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((res) => {
			const result = res.json();
			return result;
		})
	);

	let bug = bugQuery.data;
	const [progressBar, setProgressBar] = useState(rawProgress);
	const [updateInfo, setUpdateInfo] = useState({
		issue_title: undefined,
		issue_description: undefined,
		assigned_to: bug.assigned_to !== undefined ? bug.assigned_to : undefined,
		progress: bug.progress,
		status: bug.status !== undefined ? bug.status : undefined,
		status_modified_date: '',
		priority: bug.priority !== undefined ? bug.priority : undefined,
		// approved: bug.approved !== undefined ? bug.approved !== true ? bug.approved : false : undefined,
		// approved_by: bug.approved_by !== undefined ? bug.approved_by : undefined,
		resolution_summary: bug.resolution_summary !== undefined ? bug.resolution_summary : undefined,
		modified_by: bug.modified_by !== undefined ? bug.modified_by : undefined,
		actual_resolution_date: bug.actual_resolution_date !== undefined ? bug.actual_resolution_date : undefined,
	});
	const [isComplete, setIsComplete] = useState(true);
	const [isVisible, setIsVisible] = useState(false);
	const navigate = useNavigate();
	const [userSelected, setUserSelected] = useState();
	const [statusSelected, setStatusSelected] = useState();
	const [prioritySelected, setPrioritySelected] = useState();
	const queryClient = useQueryClient();


	useEffect(() => {
		setUpdateInfo({...updateInfo, status: statusSelected});
		setUpdateInfo({...updateInfo, priority: prioritySelected});
		setUpdateInfo({...updateInfo, assigned_to: userSelected});
	}, [userSelected, statusSelected, prioritySelected]);



	const allUsers = useQuery('allUser', () =>
		fetch(`http://localhost:3000/users`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((res) => {
			const result = res.json();
			return result;
		})
	);	

	// console.log('userSelected: ', userSelected, 'statusSelected: ', statusSelected, 'prioritySelected: ', prioritySelected, 'progressBar: ', progressBar);
	// console.log('updateInfo: ', updateInfo);

	const sample = [
		{
			id: 1,
			username: 'bob',
		},
		{
			id: 2,
			username: 'joe',
		},
	]

	const assignUserArray = ()=> sample.map((user, index) => {
		return {
			option: user.id,
			value: index + 1,
			display: user.username,
			separated: false
		};
	});
	
	
	const status = [
		'Open',
		'In Progress',
		'Not A Bug',
		'Not Reproducible',
		'Missing Information',
		'Pushed Back',
		'Ready For Next Release',
		'Ready For Retest',
		'Fix Not Confirmed',
		'Closed',
		'Fixed',
		'On Hold',
		'Duplicate Bug',
	];
	
	
	const assignStatusArray = () => status.map((status, index) => {
		return {		
			option: status,
			value: index,
			display: status,
			separated: false
		};
	});
	
	const priority = ['Critical', 'Urgent', 'Medium', 'Low', 'Very Low'];
	
	const assignPriorityArray = () => priority.map((priority, index) => {
		return {
			option: priority,
			value: index,
			display: priority,
			separated: false
		};
	});
	
	function visible() {
		if (isVisible) {
			return 'py-1';
		} else {
			return 'py-1 hidden';
		}
	}
	
	function changeVisible(e) {
		if (e === true) {
		setIsVisible(true)
		} else {
			setIsVisible(false);
		}
	}
	
	const handleDelete = (e) => {
		e.preventDefault();
		if (
			window.confirm(`Are you sure you want to delete Bug: ${bug.id}`) == true
			) {
				fetch(`http://localhost:3000/bugs/${bug.id}`, {
					method: 'DELETE',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
				});
				navigate('/');
			} else {
				console.log('false');
			}
		};
		
		const handleUpdate = (e) => {
			e.preventDefault();
			fetch(`http://localhost:3000/bugs/${bug.id}`, {
				method: 'PUT',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					},
					body: JSON.stringify({
						issue_title: updateInfo.issue_title !== bug.issue_description && updateInfo.issue_title !== undefined ? updateInfo.issue_title : bug.issue_description,
						issue_description: updateInfo.issue_description !== bug.issue_description && updateInfo.issue_description !== undefined ? updateInfo.issue_description : bug.issue_description,
						assigned_to: userSelected !== bug.assigned_to ? userSelected : bug.assigned_to,
						progress: updateInfo.progress !== bug.progress ? updateInfo.progress : bug.progress,
						status: statusSelected !== bug.status ? statusSelected : bug.status,
						status_modified_date: updateInfo.status_modified_date !== bug.status_modified_date ? updateInfo.status_modified_date : bug.status_modified_date,
						priority: prioritySelected !== bug.priority ? prioritySelected : bug.priority,
						// approved: updateInfo.approved,
						// approved_by: updateInfo.approved_by,
						resolution_summary: updateInfo.resolution_summary !== bug.resolution_summary ? updateInfo.resolution_summary : bug.resolution_summary,
						modified_by: user.id,
						actual_resolution_date: updateInfo.actual_resolution_date !== bug.actual_resolution_date ? updateInfo.actual_resolution_date : bug.actual_resolution_date,
					})
					}, (res) => {
						const result = res.json();
						setUpdateInfo({...updateInfo, issue_title: undefined})
						setUpdateInfo({ ...updateInfo, issue_description: undefined });
						return result;
					}
					);
					setTimeout(() => {
					queryClient.invalidateQueries('getBug');
					}, 250);
		};


			

	
	
	const handleProgressChange = (e) => {
		setProgressBar(e.target.valueAsNumber);
		setUpdateInfo({ ...updateInfo, progress: e.target.valueAsNumber });
	};

	useEffect(() => {
		console.log(statusSelected);
		if (
			statusSelected === 2 ||
			statusSelected === 3 ||
			statusSelected === 6 ||
			statusSelected === 9 ||
			statusSelected === 10 ||
			statusSelected === 12
		) {
			setUpdateInfo({ ...updateInfo, actual_resolution_date: new Date() });
			if (progressBar !== 10){
			setProgressBar(10);
			}
			changeVisible(true);
		} else {
			changeVisible(false);
		}
	}, [progressBar, statusSelected]);
	

	

	return (
		<div className='' id={bug}>
			<form className='' onSubmit={handleUpdate} id={bug}>
				<div className='container mx-auto w-11/12 md:w-2/3 max-w-lg ' id={bug}>
					<label className='py-1' id={bug}>
						Title:{' '}
					</label>
					<input
						className='py-1 h-5'
						placeholder='Update Title'
						id={bug}
						value={updateInfo.issue_title}
						onChange={(e) =>
							setUpdateInfo({ ...updateInfo, issue_title: e.target.value })
						}
					/>
					<br />
					<label className='py-1' id={bug}>
						Description:{' '}
					</label>
					<input
						className='py-1 h-5'
						placeholder='Update Description'
						id={bug}
						value={updateInfo.issue_description}
						onChange={(e) =>
							setUpdateInfo({
								...updateInfo,
								issue_description: e.target.value,
							})
						}
					/>
					<br />
					<div className='grid grid-cols-3 px-5'>
						<div className=''>
							<Dropdown
								array={assignUserArray()}
								label={'Assign User'}
								setValue={setUserSelected}
								value={userSelected}
							/>
						</div>
					</div>
					<br />
					<label className='py-1' id={bug}>
						Progress:{' '}
					</label>
					<input
						className='py-1 h-5'
						id={bug}
						type='range'
						min='0'
						max='10'
						value={progressBar}
						placeholder='Update Progress'
						onChange={handleProgressChange}
					/>
					<br />
					<div className='grid grid-cols-3 justify-self-start pr-8'>
						<Dropdown
							array={assignStatusArray()}
							label={'Status'}
							setValue={setStatusSelected}
							value={statusSelected}
						/>

						<div className='grid-start-3 justify-self-start pl-3'>
							<Dropdown
								array={assignPriorityArray()}
								label={'Priority'}
								setValue={setPrioritySelected}
								value={prioritySelected}
							/>
						</div>
					</div>
					<br />
					<div className='hidden' id={bug}>
						<label className='py-1' id={bug}>
							Approved?{' '}
						</label>
						<input
							className='py-1'
							type='checkbox'
							id={bug}
							value={updateInfo.approved}
							onChange={(e) => setUpdateInfo({ ...updateInfo, approved: true })}
						/>
					</div>
					<div className={visible()} id={bug}>
						<label className='' id={bug}>
							Resolution Summary
						</label>
						<textarea
							className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
							id={bug}
							value={updateInfo.resolution_summary}
							rows='3'
							placeholder='Detailed Explanation of the Resolution'
							onChange={(e) =>
								setUpdateInfo({
									...updateInfo,
									resolution_summary: e.target.value,
								})
							}
						/>
					</div>
					<div className='grid grid-cols-3' id={bug}>
						<button
							className='col-start-1 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-center px-6 py-3 bg-indigo-700 hover:bg-red-600 focus:outline-none rounded text-sm font-bold text-md leading-none text-white'
							id={bug}
						>
							Submit
						</button>

						<button
							className='col-start-3 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-center px-6 py-3 bg-indigo-700 hover:bg-red-600 focus:outline-none rounded text-sm font-bold text-md leading-none text-white'
							id={bug}
							type='button'
							onClick={handleDelete}
						>
							Delete Bug
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default ModifyBug;
