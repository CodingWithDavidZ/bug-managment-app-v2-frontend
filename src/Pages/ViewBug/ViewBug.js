import React from 'react';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../../Context/AppContext';
import DateFormat from '../../Components/DateFormat';
import Comments from './Comments';

function ViewBug() {
	const { bug, allUsers, setBug } = useContext(AppContext);
	const[value, setValue] = useState('');


    console.log('allUsers', allUsers);

    function findUser(id) {
        const user = allUsers.find((user) => user.id === id);
        return user.username;
    }

	const bugId = bug.id;
	const issueTitle = bug.issue_title;
	const issueDescription = bug.issue_description;
	const identifiedBy = findUser(bug.identified_by);
	const identifiedDate = (bug.identified_date !== null) ? <DateFormat time={bug.identified_date} /> : null;
	const projectId = bug.project_id;
	const assignedTo = (bug.assigned_to !== null) ? findUser(bug.assigned_to) : 'Unassigned';
	const status = bug.status;
	const statusModifiedDate = (bug.status_modified_date !== null) ? <DateFormat time={bug.status_modified_date} />: null;
	const priority = bug.priority;
	const targetResolutionDate = (bug.target_resolution_date !== null) ? <DateFormat time={bug.target_resolution_date} /> : 'No Target Resolution Date';
	const progress = `${bug.progress}0%`;
	const actualResolutionDate = (bug.actual_resolution_date !== null) ? <DateFormat time={bug.actual_resolution_date} /> : null;
	const resolutionSummary = bug.resolution_summary;
	const modifiedBy = (bug.modified_by !== null) ? findUser(bug.modified_by) : null;
	const approvedBy = bug.approved_by
	const imageUrl = bug.image_url;
	const approved = bug.approved;
	const createdBy = (bug.created_by) ? findUser(bug.created_by) : 'Not Created';
	const createdAt = <DateFormat time={bug.created_at} />;
	const updatedAt = <DateFormat time={bug.updated_at} />;

	const handleChange = (e) => {
		setValue(e.target.value);
	}

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
		<div>
			<div>
				<div>Bug Id: {bugId}</div>
				<div>Issue Title: {issueTitle}</div>
				<div>Issue Description: {issueDescription}</div>
				<div>
					{identifiedBy !== createdBy ? `Identified By: ${identifiedBy}` : null}
				</div>
				<div>
					{identifiedDate !== null
						? `Identified Date: ${identifiedDate}`
						: null}
				</div>
				<div>{projectId !== null ? `Project Id: ${projectId}` : null}</div>
				<div>Assigned To: {assignedTo}</div>
				<div>Status: {status}</div>
				<div>
					{statusModifiedDate !== null
						? `Status Modified Date: ${statusModifiedDate}`
						: null}
				</div>
				<div>Priority: {priority}</div>
				<div>Target Resolution Date: {targetResolutionDate}</div>
				<div>Progress: {progress}</div>
				<div>
					{actualResolutionDate !== null
						? `Actual Resolution Date: {actualResolutionDate}`
						: null}
				</div>
				<div>
					{actualResolutionDate !== null
						? `Resolution summary: ${resolutionSummary}`
						: null}
				</div>
				<div>
					{modifiedBy !== null ? `Last Modified by: ${modifiedBy}` : null}
				</div>
				<div>{approvedBy !== null ? `Approved By: ${approvedBy}` : null}</div>
				<div>{imageUrl !== null ? `Image url:${imageUrl}` : null}</div>
				<div>{approved !== null ? `Approved: ${approved}` : null}</div>
				<div>Created by: {createdBy}</div>
				<div>Created at: {createdAt}</div>
				<div>Updated at: {updatedAt}</div>
				<div>_________________________________________</div>

				<Comments />
				<form onSubmit={addComment} id={bug.id} value={value}>
					<input
						type='text'
						name='comment'
						placeholder='Add Comment'
						id={bug.id}
						value={value}
						onChange={handleChange}
					/>
					<button type='submit' id={bug.id}>
						Submit
					</button>
				</form>
				<br />
			</div>
		</div>
	);
}

export default ViewBug;
