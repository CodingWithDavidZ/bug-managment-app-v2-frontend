import React, { useContext, useEffect, useCallback, useState } from 'react';
import AppContext from '../../Context/AppContext';
import DateFormat from '../../Components/DateFormat';
import { useNavigate } from 'react-router-dom';

function Comments() {
	const { bug, allUsers, setBug } = useContext(AppContext);
	const [valueHere, setValueHere] = useState('');
	const navigate = useNavigate();

	const handleChange = (e) => {
		e.preventDefault();
		setValueHere(e.target.value);
	};

	async function addComment(e) {
		e.preventDefault(); //! If I remove this, the page will refresh but I will not lose state but the fetch won't fire
		await fetch(`http://localhost:3000/bugs/${e.target.id}/comments`, {
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
				setBug((prev) => [...prev.comments, data]);
				navigate(`/viewBug`);
			})
			.catch((err) => console.log(err));
	}

	const findUser = useCallback(
		(id) => {
			console.log('Comments.js: findUser: allUsers ', allUsers, 'id ', id);
			// allUsers.find((user) =>  user.id === id  )
			
				const allUsersUsernames = allUsers.filter((user) => user.id === id)[0]
					.username;
				return allUsersUsernames;
			
		},
		[allUsers]
	);

	const mapComments = bug.comments.map((comment, index) => {
		return (
			<div className='grid grid-cols-3' key={`id: ${comment.id} fragment 0`}>
				<br />

				<div
					className='comment container col-start-2 px-3 bg-indigo-100 rounded-lg font-medium'
					key={`id: ${comment.id} div 0`}
				>
					<div className='col-span-2 font-bold'>
						<strong>Comment:</strong> {index + 1} of {bug.comments.length}:
						&nbsp;
					</div>
					<div key={`id: ${comment.id} div 1'`}>
						<span key={`id: ${comment.id} span 0`}>
							<strong>Comment Id:</strong> {comment.id}
						</span>
						&nbsp;&nbsp;&nbsp;
						<span key={`id: ${comment.id} span 1`}>
							<strong>Bug Id:</strong> {comment.bug_id}
						</span>
						&nbsp;&nbsp;&nbsp;
						<span key={`id: ${comment.id} span 2`}>
							<strong>By:</strong> {findUser(comment.created_by)}
						</span>
					</div>
					<div key={`id: ${comment.id} div 2'`}>
						<strong>Message:</strong> {comment.comment_text}
					</div>
					<div key={`id: ${comment.id} div 3'`}>
						<span key={`id: ${comment.id} span 3`}>
							<strong>Created:</strong> <DateFormat time={comment.created_at} />
						</span>
						&nbsp;&nbsp;&nbsp;
						<span key={`id: ${comment.id} span 4`}>
							<strong>Updated:</strong> <DateFormat time={comment.updated_at} />
						</span>
					</div>
					<br />
				</div>
				<div className='py-1 bg-white col-start-2'></div>
			</div>
		);
	});

	return (
		<>
			<div>{mapComments}</div>
			<div className='grid grid-cols-3'>
				<form
					className='col-start-2 grid justify-center'
					onSubmit={addComment}
					id={bug.id}
					value={valueHere}
				>
					<span>
						<input
							className='border-2 px-2 text-indigo-600'
							type='text'
							name='comment'
							placeholder='Add Comment'
							id={bug.id}
							value={valueHere}
							onChange={handleChange}
						/>
						<button
							className='bg-indigo-600 text-white px-2 rounded-md '
							type='submit'
							id={bug.id}
						>
							Submit
						</button>
					</span>
				</form>
			</div>
		</>
	);
}

export default Comments;
