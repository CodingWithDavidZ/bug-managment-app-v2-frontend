import React from 'react';
import { useContext, useEffect } from 'react';
import AppContext from '../../Context/AppContext';
import DateFormat from '../../Components/DateFormat';
import Comments from './Comments';
import ModifyBug from './ModifyBug';
import { useQuery } from 'react-query';
import Loading from '../../Components/Loading';

function ViewBug() {
	const { setBugInStorage, bugInStorage, isLoading, setIsLoading} = useContext(AppContext);

	useEffect(() => {
		setBugInStorage(window.localStorage.getItem('bug'));
	}, []);

	const bug = useQuery(['getBug', bugInStorage], () =>
		fetch(
			`https://git.heroku.com/tranquil-depths-19820.git/bugs/${bugInStorage}`,
			{
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		).then((res) => {
			const result = res.json();
			return result;
		})
	);

	const allUsers = useQuery('allUser', () =>
		fetch(`https://git.heroku.com/tranquil-depths-19820.git/users`, {
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


	if (bug.isLoading) {
		return <Loading/>;
	}


	if (allUsers.isLoading) {
		return <Loading/>;
	}

	function findUser(id) {
		if (allUsers.data) {
			//check if the user exists
			if (allUsers.data.find((user) => user.id === id)){
			const user = allUsers.data.find((user) => user.id === id);
				return user.username;
			} else {
				return 'Unknown';
			}
		}
	}
		


	const bugId = bug.data.id;
	const issueTitle = bug.data.issue_title;
	const issueDescription = bug.data.issue_description;
	const identifiedBy = () => {
	    if (bug.data.identified_by !== null) {
					return findUser(bug.data.identified_by);
					} else {
						return findUser(bug.data.created_by);
					}
				};
	const identifiedDate = bug.data.identified_date !== null && (
		<DateFormat time={bug.data.identified_date} />
	);
	const projectId = bug.data.project_id;
	const assignedTo =
		bug.data.assigned_to !== null
			? findUser(bug.data.assigned_to)
			: 'Unassigned';
	const status = bug.data.status;
	const statusModifiedDate =
		bug.data.status_modified_date !== null ? (
			<DateFormat time={bug.data.status_modified_date} />
		) : null;
	const priority = bug.data.priority;
	const targetResolutionDate =
		bug.data.target_resolution_date !== null ? (
			<DateFormat time={bug.data.target_resolution_date} />
		) : (
			'No Target Resolution Date'
		);
	const progress = `${bug.data.progress}0`;
	const rawProgress = bug.data.progress !== null ? bug.data.progress : 0;
	const actualResolutionDate =
		bug.data.actual_resolution_date !== null ? (
			<DateFormat time={bug.data.actual_resolution_date} />
		) : null;
	const resolutionSummary = bug.data.resolution_summary;
	const modifiedBy =
		bug.data.modified_by !== null && findUser(bug.data.modified_by);
	const approvedBy = bug.data.approved_by;
	const imageUrl = bug.data.image_url;
	const approved = bug.data.approved;
	const createdBy = bug.data.created_by
		? findUser(bug.data.created_by)
		: 'Not Created';
	const createdAt = <DateFormat time={bug.data.created_at} />;
	const updatedAt = <DateFormat time={bug.data.updated_at} />;

	function renderProgressBar(progressBar) {
		switch (
			progressBar //Responsible for displaying the progress bar and coloring it based on the progress
		) {
			case 'null0' || '0':
				return <div></div>;
			case '10':
				return (
					<div className='bg-red-700 w-8 h-full' value={progressBar}></div>
				);
			case '20':
				return (
					<div className='bg-red-500 w-1/5 h-full' value={progressBar}></div>
				);
			case '30':
				return (
					<div className='bg-orange-700 w-1/3 h-full' value={progressBar}></div>
				);
			case '40':
				return (
					<div className='bg-orange-500 w-2/5 h-full' value={progressBar}></div>
				);
			case '50':
				return (
					<div className='bg-cyan-700 w-6/12 h-full' value={progressBar}></div>
				);
			case '60':
				return (
					<div className='bg-sky-700 w-3/5 h-full' value={progressBar}></div>
				);
			case '70':
				return (
					<div className='bg-blue-500 w-3/4 h-full' value={progressBar}></div>
				);
			case '80':
				return (
					<div className='bg-teal-500 w-4/5 h-full' value={progressBar}></div>
				);
			case '90':
				return (
					<div
						className='bg-green-500 w-11/12 h-full'
						value={progressBar}
					></div>
				);
			case '100':
				return (
					<div
						className='bg-green-700 h-full text-center text-white'
						value={progressBar}
					>
						Closed
					</div>
				);
			default:
				return <div></div>;
		}
	}

	return (
		<div className=''>
			<div className=''>
				<div className='pl-12'>
					<div className='grid grid-col-3 pb-3 '>
						<div className='pl-3 col-start-1 col-end-2 '>
							<div className=''>
								<span className=''>
									<strong>Bug Id:</strong> {bugId},
								</span>
								<span className='px-1'>
									{identifiedBy !== createdBy ? (
										<span>
											<span className='font-bold'> Identified By:</span>
											<span className='px-1'> {identifiedBy()},</span>
										</span>
									) : null}
								</span>
								<span className='px-1'>
									<strong>Issue Title: </strong> {issueTitle},
								</span>
							</div>
							<div className='w-2/3'>
								<strong>Issue Description:</strong>{' '}
								<div className=''>{issueDescription}</div>
							</div>
							<div className=' '>
								{identifiedDate !== null ? (
									<div className=''>
										<span className='font-bold'>Identified Date: </span>
										<div className=''>{identifiedDate}</div>
									</div>
								) : null}
							</div>
							<div>
								{projectId !== null ? (
									<div>
										<span className='font-bold'>Project Id: </span>
										<span>{projectId}</span>
									</div>
								) : null}
							</div>
							<div>
								<strong>Assigned To:</strong> {assignedTo}
							</div>
							<div>
								<span>
									<strong>Status:</strong> {status},
								</span>
								<span className='px-1'>
									<strong>Priority:</strong> {priority}
								</span>
								<div className='font-bold'>Progress:</div>
								<div className='bg-gray-300 w-1/3  h-5' value={progress}>
									{renderProgressBar(progress)}
								</div>
							</div>
							<div className=''>
								{statusModifiedDate !== null ? (
									<div>
										<span className='font-bold'> Status Modified Date: </span>
										<span>{statusModifiedDate}</span>
									</div>
								) : null}
							</div>
							<div>
								<strong>Target Resolution Date:</strong> {targetResolutionDate}
							</div>
							<div className=''>
								{actualResolutionDate !== null ? (
									<div className=''>
										<span className='font-bold'> Actual Resolution Date: </span>
										<div className=''>{actualResolutionDate}</div>
									</div>
								) : null}
							</div>
							<div className='w-2/3'>
								{actualResolutionDate !== null ? (
									<div>
										<span className='font-bold'> Resolution Summary: </span>
										<span className=''>{resolutionSummary}</span>
									</div>
								) : null}
							</div>
							<div>
								{modifiedBy !== null ? (
									<div>
										<span className='font-bold'> Modified By: </span>
										<span>{modifiedBy}</span>
									</div>
								) : null}
							</div>
							<div>
								{approvedBy !== null ? (
									<div>
										<span className='font-bold'> Approved By: </span>
										<span>{approvedBy}</span>
									</div>
								) : null}
							</div>
							<div>
								{imageUrl !== null ? (
									<div>
										<span className='font-bold'> Image Url: </span>
										<span>{imageUrl}</span>
									</div>
								) : null}
							</div>
							<div>
								{approved === (true || false) ? (
									<div>
										<span className='font-bold'> Approved: </span>
										<span>{approved}</span>
									</div>
								) : null}
							</div>
							<div>
								<span className=''>
									<strong>Created by:</strong> {createdBy}
								</span>
								<span className='px-1'>
									<strong>Created at:</strong> {createdAt}
								</span>
								<span className='px-1'>
									<strong>Updated at:</strong> {updatedAt}
								</span>
							</div>
						</div>
						<div className='col-end-3 self-start pb-3'>
							<ModifyBug rawProgress={rawProgress} bug={bug.data} />
						</div>
					</div>
				</div>
				<div className='h-1 bg-gray-800'></div>
				<div className='py-3'>
					<Comments className='' bugId={bugId} />
					<br />
				</div>
			</div>
		</div>
	);
}

export default ViewBug;
