import React, { useContext, useState } from 'react';
import AppContext from '../../Context/AppContext';
import DateFormat from '../../Components/DateFormat';
import { useQuery, useQueryClient } from 'react-query';
import Loading from '../../Components/Loading';

function Comments() {
	const { bugInStorage } = useContext(AppContext);
	const [valueHere, setValueHere] = useState('');
	const queryClient = useQueryClient();

	const { data, isLoading } = useQuery(['getBug', bugInStorage], () =>
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

	if (isLoading) {
		return <Loading/>;
	}

	if(allUsers.isLoading) {
		return <Loading/>;
	}

	const handleChange = (e) => {
		e.preventDefault();
		setValueHere(e.target.value);
	};

	async function addComment(e) {
		e.preventDefault();
		await fetch(
			`https://git.heroku.com/tranquil-depths-19820.git/bugs/${e.target.id}/comments`,
			{
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					bug_id: e.target.id,
					comment_text: e.target.attributes.value.value,
				}),
			}
		)
			.then((res) => res.json())
			.then((data) => {
				queryClient.invalidateQueries('getBug');
				setValueHere('');
			})
			.catch((err) => console.log(err));
	}

	function findUser(id) {
		//check if the user exists
		if (allUsers.data) {
			if (allUsers.data.find((user) => user.id === id)) {
				const user = allUsers.data.find((user) => user.id === id);
				return user.username;
			} else {
				return 'Unknown';
			}
		}
	}

	const mapComments = data.comments.map((comment, index) => {
		return (
			<div className='grid grid-cols-3' key={`id: ${comment.id} fragment 0`}>
				<br />

				<div
					className='comment container col-start-2 px-3 bg-indigo-100 rounded-lg font-medium'
					key={`id: ${comment.id} div 0`}
				>
					<div className='col-span-2 font-bold'>
						<strong>Comment:</strong> {index + 1} of {data.comments.length}:
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
					<div key={`id: ${comment.id} div 3'`}>
						<span key={`id: ${comment.id} span 3`}>
							<strong>Created:</strong> <DateFormat time={comment.created_at} />
						</span>
						&nbsp;&nbsp;&nbsp;
						<span key={`id: ${comment.id} span 4`}>
							<strong>Updated:</strong> <DateFormat time={comment.updated_at} />
						</span>
						<div key={`id: ${comment.id} div 2'`}>
							<strong>Message:</strong> {comment.comment_text}
						</div>
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
					id={data.id}
					value={valueHere}
				>
					<span>
						<input
							className='border-2 px-2 text-indigo-600'
							type='text'
							name='comment'
							placeholder='Add Comment'
							id={data.id}
							value={valueHere}
							onChange={handleChange}
						/>
						<button
							className='bg-indigo-600 text-white px-2 rounded-md '
							type='submit'
							id={data.id}
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
