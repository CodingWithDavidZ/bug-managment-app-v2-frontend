import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../Context/AppContext';
import Dropdown from '../../Components/Dropdown';
import { useQuery, useQueryClient } from 'react-query';

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
	const defaultInfo = {
		issue_title: undefined,
		issue_description: undefined,
		assigned_to: bug.assigned_to !== undefined ? bug.assigned_to : undefined,
		progress: bug.progress,
		status: bug.status !== undefined ? bug.status : undefined,
		status_modified_date: '',
		priority: bug.priority !== undefined ? bug.priority : undefined,
		// approved: bug.approved !== undefined ? bug.approved !== true ? bug.approved : false : undefined,
		// approved_by: bug.approved_by !== undefined ? bug.approved_by : undefined,
		resolution_summary:
			bug.resolution_summary !== undefined ? bug.resolution_summary : undefined,
		modified_by: bug.modified_by !== undefined ? bug.modified_by : undefined,
		actual_resolution_date:
			bug.actual_resolution_date !== undefined
				? bug.actual_resolution_date
				: undefined,
	};
	const [updateInfo, setUpdateInfo] = useState(defaultInfo);
	const [titleValue, setTitleValue] = useState('');
	const [descriptionValue, setDescriptionValue] = useState('');
	const [progressValue, setProgressValue] = useState('');
	const [statusModifiedDateValue, setStatusModifiedDateValue] = useState('');
	const [resolutionSummaryValue, setResolutionSummaryValue] = useState('');
	const [actualResolutionDateValue, setActualResolutionDateValue] =
		useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const navigate = useNavigate();
	const [userSelected, setUserSelected] = useState();
	const [statusValue, setStatusValue] = useState();
	const [prioritySelected, setPrioritySelected] = useState();
	const queryClient = useQueryClient();

	useEffect(() => {
		setUpdateInfo({ ...updateInfo, status: statusValue });
		setUpdateInfo({ ...updateInfo, priority: prioritySelected });
		setUpdateInfo({ ...updateInfo, assigned_to: userSelected });
	}, [userSelected, statusValue, prioritySelected]);

	// console.log('updateInfo', updateInfo);

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

	const assignUserArray = () =>
		allUsers.data.map((user, index) => {
			return {
				option: user.id,
				value: index,
				display: user.username,
				separated: false,
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

	const assignStatusArray = () =>
		status.map((status, index) => {
			return {
				option: status,
				value: index,
				display: status,
				separated: false,
			};
		});

	const priority = ['Critical', 'Urgent', 'Medium', 'Low', 'Very Low'];

	const assignPriorityArray = () =>
		priority.map((priority, index) => {
			return {
				option: priority,
				value: index,
				display: priority,
				separated: false,
			};
		});

	function visible() {
		if (isVisible) {
			return ' col-span-2';
		} else {
			return ' hidden';
		}
	}

	function changeVisible(e) {
		if (e === true) {
			setIsVisible(true);
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

	console.log(bug.resolution_summary);
	console.log(bug.resolution_summary === resolutionSummaryValue);

	const handleUpdate = (e) => {
		e.preventDefault();
		setStatusModifiedDateValue(new Date());
		console.log('titleValue', titleValue, 'descriptionValue', descriptionValue);
		fetch(
			`http://localhost:3000/bugs/${bug.id}`,
			{
				method: 'PUT',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify({
					issue_title:
						titleValue !== bug.issue_description && titleValue !== ''
							? titleValue
							: bug.title,
					issue_description:
						descriptionValue !== bug.issue_description &&
						descriptionValue !== ''
							? descriptionValue
							: bug.issue_description,
					assigned_to:
						userSelected + 1 !== bug.assigned_to
							? userSelected + 1
							: bug.assigned_to,
					progress: progressBar !== bug.progress ? progressBar : bug.progress,
					status: statusValue !== bug.status ? statusValue : bug.status,
					status_modified_date: statusModifiedDateValue,
					priority:
						prioritySelected !== bug.priority ? prioritySelected : bug.priority,
					// approved: updateInfo.approved,
					// approved_by: updateInfo.approved_by,
					resolution_summary:
						resolutionSummaryValue !== bug.resolution_summary &&
						resolutionSummaryValue !== ''
							? resolutionSummaryValue
							: bug.resolution_summary,
					modified_by: user.id,
					actual_resolution_date:
						actualResolutionDateValue !== bug.actual_resolution_date &&
						actualResolutionDateValue !== ''
							? actualResolutionDateValue
							: bug.actual_resolution_date,
				}),
			},
			(res) => {
				const result = res.json();
				return result;
			}
		);
		setTitleValue('');
		setDescriptionValue('');
		// setProgressBar('');
		setStatusModifiedDateValue('');
		setResolutionSummaryValue('');
		setActualResolutionDateValue('');
		// setUserSelected('');
		// setStatusValue('');
		// setPrioritySelected('');
		setTimeout(() => {
			queryClient.invalidateQueries('getBug');
		}, 250);
	};

	const handleProgressChange = (e) => {
		setProgressBar(e.target.valueAsNumber);
		setUpdateInfo({ ...updateInfo, progress: e.target.valueAsNumber });
	};

	useEffect(() => {
		if (
			statusValue === 2 ||
			statusValue === 3 ||
			statusValue === 6 ||
			statusValue === 9 ||
			statusValue === 10 ||
			statusValue === 12
		) {
			setActualResolutionDateValue(new Date());
			if (progressBar !== 10) {
				setProgressBar(10);
			}
			changeVisible(true);
		} else {
			changeVisible(false);
		}
	}, [progressBar, statusValue]);

	return (
		<div className='pr-12' id={bug}>
			<h1 className='font-bold pb-3 pl-12 underline underline-offset-4 decoration-2'>Modify Bug:</h1>
			<form className='' onSubmit={handleUpdate} id={bug}>
				<div
					className='grid grid-cols-3 gap-y-2 gap-x-4 pl-12 pr-12 max-w-1/2 leading-none'
					id={bug}
				>
					<label className='col-start-1 font-bold' id={bug}>
						Title:{}
					</label>
					<input
						className='col-start-1 h-5 '
						placeholder='Update Title'
						id={bug}
						value={titleValue}
						onChange={(e) => setTitleValue(e.target.value)}
					/>

					<label className='col-start-1 font-bold ' id={bug}>
						Description:{' '}
					</label>
					<input
						className='col-start-1  h-5'
						placeholder='Update Description'
						id={bug}
						value={descriptionValue}
						onChange={(e) => setDescriptionValue(e.target.value)}
					/>

					<div className='col-start-1 pt-3'>
						<div className=''>
							<Dropdown
								array={assignUserArray()}
								label={'Assign User'}
								setValue={setUserSelected}
								value={userSelected}
							/>
						</div>
					</div>

					<label className=' col-start-1 font-bold' id={bug}>
						Progress:{' '}
					</label>
					<input
						className=' h-5 col-start-1'
						id={bug}
						type='range'
						min='0'
						max='10'
						value={progressBar}
						placeholder='Update Progress'
						onChange={handleProgressChange}
					/>

					<div className='col-start-1 col-end-1 '>
						<Dropdown
							array={assignStatusArray()}
							label={'Status'}
							setValue={setStatusValue}
							value={statusValue}
						/>
					</div>

					<div className='col-start-2  pl-3 '>
						<Dropdown
							array={assignPriorityArray()}
							label={'Priority'}
							setValue={setPrioritySelected}
							value={prioritySelected}
						/>
					</div>

					<div className='hidden' id={bug}>
						<label className='' id={bug}>
							Approved?{' '}
						</label>
						<input
							className=''
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
							className='form-control block w-full px-3 .5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
							id={bug}
							value={resolutionSummaryValue}
							rows='3'
							placeholder='Detailed Explanation of the Resolution'
							onChange={(e) => setResolutionSummaryValue(e.target.value)}
						/>
					</div>
					<br />
					{/* <div className='col-start-1' id={bug}> */}
					<span className='col-start-1'>
						<button
							className='uppercase w-4/5 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 items-center justify-center  py-3 bg-indigo-700 hover:bg-red-600 focus:outline-none rounded font-bold text-md leading-none text-white'
							id={bug}
						>
							Submit
						</button>
					</span>
					<span className='col-start-2'>
						<button
							className='uppercase w-4/5 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0  items-center justify-center py-3 bg-indigo-700 hover:bg-red-600 focus:outline-none rounded font-bold text-md leading-none text-white'
							id={bug}
							type='button'
							onClick={handleDelete}
						>
							Delete Bug
						</button>
					</span>
					{/* </div> */}
				</div>
			</form>
		</div>
	);
}

export default ModifyBug;
