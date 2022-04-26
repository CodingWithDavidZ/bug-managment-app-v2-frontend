import React from 'react';
import { useContext, useEffect, useState, useCallback } from 'react';
import AppContext from '../../Context/AppContext';
import DateFormat from '../../Components/DateFormat';
import Comments from './Comments';

function ViewBug({ allUsers, setAllUsers }) {
	const { bug, setBug } = useContext(AppContext);
	const [value, setValue] = useState('');

	console.log('bug', bug);
	// useEffect(() => {
	// 	console.log('ViewBug.js: useEffect: allUsers ', allUsers);
	// 	if (allUsers.length <= 0 || allUsers.length === undefined) {
	// 		fetch(`http://localhost:3000/users`, {
	// 			method: 'GET',
	// 			credentials: 'include',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			},
	// 		}).then((r) => {
	// 			if (r.ok) {
	// 				r.json().then((users) => {
	// 					setAllUsers(users);
	// 				});
	// 				console.log('ViewBug.js: useEffect: allUsers 2', allUsers.length);
	// 			}
	// 		});
	// 	}
	// }, []);

	const findUser = useCallback(
		(id) => {
			console.log('ViewBug.js: findUser: allUsers ', allUsers, 'id ', id);
			// allUsers.find((user) =>  user.id === id  )
			return allUsers.find((user) => user.id === id).username;
		},
		[allUsers]
	);

	const bugId = bug.id;
	const issueTitle = bug.issue_title;
	const issueDescription = bug.issue_description;
	const identifiedBy =
		bug.identified_by !== null
			? findUser(bug.identified_by)
			: findUser(bug.created_by);
	const identifiedDate =
		bug.identified_date !== null ? (
			<DateFormat time={bug.identified_date} />
		) : null;
	const projectId = bug.project_id;
	const assignedTo =
		bug.assigned_to !== null ? findUser(bug.assigned_to) : 'Unassigned';
	const status = bug.status;
	const statusModifiedDate =
		bug.status_modified_date !== null ? (
			<DateFormat time={bug.status_modified_date} />
		) : null;
	const priority = bug.priority;
	const targetResolutionDate =
		bug.target_resolution_date !== null ? (
			<DateFormat time={bug.target_resolution_date} />
		) : (
			'No Target Resolution Date'
		);
	const progress = `${bug.progress}0%`;
	const actualResolutionDate =
		bug.actual_resolution_date !== null ? (
			<DateFormat time={bug.actual_resolution_date} />
		) : null;
	const resolutionSummary = bug.resolution_summary;
	const modifiedBy =
		bug.modified_by !== null ? findUser(bug.modified_by) : null;
	const approvedBy = bug.approved_by;
	const imageUrl = bug.image_url;
	const approved = bug.approved;
	const createdBy = bug.created_by ? findUser(bug.created_by) : 'Not Created';
	const createdAt = <DateFormat time={bug.created_at} />;
	const updatedAt = <DateFormat time={bug.updated_at} />;

	const handleChange = (e) => {
		setValue(e.target.value);
	};

	async function addComment(e) {
		e.preventDefault();
		fetch(`http://localhost:3000/bugs/${e.target.id}/comments`, {
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				bug_id: e.target.id,
				comment_text: e.target.attributes.value.value,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				setBug(...bug.comments, data);
			})
			.catch((err) => console.log(err));
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
					<strong>Issue Description:</strong> {issueDescription}
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
					<div className='bg-gray-300 w-1/3  h-3'>
						<div className='bg-blue-500 w-11/12 h-full'></div>
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
					findUser={findUser}
					addComment={addComment}
					value={value}
					handleChange={handleChange}
				/>
				<br />
			</div>
		</div>
	);
}

export default ViewBug;
