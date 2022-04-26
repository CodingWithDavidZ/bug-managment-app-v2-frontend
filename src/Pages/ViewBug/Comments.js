import React, { useContext, useEffect } from 'react';
import AppContext from '../../Context/AppContext';
import DateFormat from '../../Components/DateFormat';

function Comments({ findUser, addComment, handleChange, value }) {
	const { bug } = useContext(AppContext);

	const mapComments = bug.comments.map((comment, index) => {
		return (
			<div className='grid grid-cols-3' key={`id: ${comment.id} fragment 0`}>
				<br />

				<div
					className='comment container col-start-2 px-3 bg-indigo-100 rounded-lg font-medium'
					key={`id: ${comment.id} div 0`}
				>
					<div className='col-span-2 font-bold'>
						Comment: {index + 1} of {bug.comments.length}: &nbsp;
					</div>
					<div key={`id: ${comment.id} div 1'`}>
						<span key={`id: ${comment.id} span 0`}>
							Comment Id: {comment.id}
						</span>
						&nbsp;&nbsp;&nbsp;
						<span key={`id: ${comment.id} span 1`}>
							Bug Id: {comment.bug_id}
						</span>
						&nbsp;&nbsp;&nbsp;
						<span key={`id: ${comment.id} span 2`}>
							By: {findUser(comment.created_by)}
						</span>
					</div>
					<div key={`id: ${comment.id} div 2'`}>
						Message: {comment.comment_text}
					</div>
					<div key={`id: ${comment.id} div 3'`}>
						<span key={`id: ${comment.id} span 3`}>
							Created: <DateFormat time={comment.created_at} />
						</span>
						&nbsp;&nbsp;&nbsp;
						<span key={`id: ${comment.id} span 4`}>
							Updated: <DateFormat time={comment.updated_at} />
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
					value={value}
				>
					<span>
						<input
							className='border-2 px-2 text-indigo-600'
							type='text'
							name='comment'
							placeholder='Add Comment'
							id={bug.id}
							value={value}
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
