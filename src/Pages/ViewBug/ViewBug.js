import React from 'react';
import { useContext, useEffect, useState, useCallback } from 'react';
import AppContext from '../../Context/AppContext';
import DateFormat from '../../Components/DateFormat';
import Comments from './Comments';
import {getBug, getAllUsers} from '../../Api/ApiCalls';
import { useQuery } from 'react-query';

function ViewBug() {
	const { test } = useContext(AppContext);

	const allUsers = useQuery('allUsers', () => getAllUsers());

	// const bugQuery = useQuery('getBug', () => getBug(test));
	useEffect((e) => {
		async function (e) {
			console.log('getBug ApiCall: ', e);
			const response = await fetch(`http://localhost:3000/bugs/${e}`, {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			setBug(response.json());
		}
	}, []);
	
	

	const findUser = useCallback(
		(id) => {

			// allUsers.find((user) =>  user.id === id  )

			const allUsersUsernames = allUsers.data.filter(
				(user) => user.id === id
			)[0].username;
			return allUsersUsernames;
		},
		[allUsers]
	);

	

	const bugId = bugQuery.data.id;
	const issueTitle = bugQuery.data.issue_title;
	const issueDescription = bugQuery.data.issue_description;
	const identifiedBy =
		bugQuery.data.identified_by !== null
			? findUser(bugQuery.data.identified_by)
			: findUser(bugQuery.data.created_by);
	const identifiedDate = bugQuery.data.identified_date !== null && (
		<DateFormat time={bugQuery.data.identified_date} />
	);
	const projectId = bugQuery.data.project_id;
	const assignedTo =
		bugQuery.data.assigned_to !== null ? findUser(bugQuery.data.assigned_to) : 'Unassigned';
	const status = bugQuery.data.status;
	const statusModifiedDate =
		bugQuery.data.status_modified_date !== null ? (
			<DateFormat time={bugQuery.data.status_modified_date} />
		) : null;
	const priority = bugQuery.data.priority;
	const targetResolutionDate =
		bugQuery.data.target_resolution_date !== null ? (
			<DateFormat time={bugQuery.data.target_resolution_date} />
		) : (
			'No Target Resolution Date'
		);
	const progress = `${bugQuery.data.progress}0`;
	const actualResolutionDate =
		bugQuery.data.actual_resolution_date !== null ? (
			<DateFormat time={bugQuery.data.actual_resolution_date} />
		) : null;
	const resolutionSummary = bugQuery.data.resolution_summary;
	const modifiedBy = bugQuery.data.modified_by !== null && findUser(bugQuery.data.modified_by);
	const approvedBy = bugQuery.data.approved_by;
	const imageUrl = bugQuery.data.image_url;
	const approved = bugQuery.data.approved;
	const createdBy = bugQuery.data.created_by ? findUser(bugQuery.data.created_by) : 'Not Created';
	const createdAt = <DateFormat time={bugQuery.data.created_at} />;
	const updatedAt = <DateFormat time={bugQuery.data.updated_at} />;

	function renderProgressBar(progressBar) {
		switch (progressBar) {
			case '0':
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
					<div className='bg-blue-500 w-80 h-full' value={progressBar}></div>
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

	// const handleChange = (e) => {
	// 	e.preventDefault();
	// 	setValue(e.target.value);
	// };

	// async function addComment(e) {
	// 	e.preventDefault();
	// 	fetch(`http://localhost:3000/bugs/${e.target.id}/comments`, {
	// 		method: 'PUT',
	// 		credentials: 'include',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify({
	// 			bug_id: e.target.id,
	// 			comment_text: e.target.attributes.value.value,
	// 		}),
	// 	})
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			setBug((prev) => [...prev.comments, data]);
	// 		})
	// 		.catch((err) => console.log(err));
	// }

	if (bugQuery.isLoading) {
		return <div>Loading...</div>;
	}

	if (allUsers.isLoading){
		return <div>Loading...</div>
	}

	return (
		<div className='px-3'>
			<div>
				<div className=''>
					<span className=''>
						<strong>Bug Id:</strong> {bugId},
					</span>
					<span className='px-1'>
						{identifiedBy !== createdBy ? (
							<span>
								<span className='font-bold'> Identified By:</span>
								<span className='px-1'> {identifiedBy},</span>
							</span>
						) : null}
					</span>
					<span className='px-1'>
						<strong>Issue Title: </strong> {issueTitle},
					</span>
				</div>
				<div>
					<strong>Issue Description:</strong> <div>{issueDescription}</div>
				</div>
				<div>
					{identifiedDate !== null ? (
						<div>
							<span className='font-bold'>Identified Date: </span>
							<span>{identifiedDate}</span>
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
						{renderProgressBar('100')}
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
				<div>
					{actualResolutionDate !== null ? (
						<div>
							<span className='font-bold'> Actual Resolution Date: </span>
							<span>{actualResolutionDate}</span>
						</div>
					) : null}
				</div>
				<div>
					{actualResolutionDate !== null ? (
						<div>
							<span className='font-bold'> Resolution Summary: </span>
							<span>{resolutionSummary}</span>
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
				<div>_________________________________________</div>

				<Comments
					className=''
					bugQuery={bugQuery}
				/>
				<br />
			</div>
		</div>
	);
}

export default ViewBug;
