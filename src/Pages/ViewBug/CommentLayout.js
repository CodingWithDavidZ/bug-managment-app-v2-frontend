import React from 'react'
import DateFormat from '../../Components/DateFormat';

function CommentLayout(comment, index, findUser, bugQuery) {
  return (
		<div className='grid grid-cols-3' key={`id: ${comment.id} fragment 0`}>
			<br />

			<div
				className='comment container col-start-2 px-3 bg-indigo-100 rounded-lg font-medium'
				key={`id: ${comment.id} div 0`}
			>
				<div className='col-span-2 font-bold'>
					<strong>Comment:</strong> {index + 1} of{' '}
					{bugQuery.data.comments.length}: &nbsp;
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
}

export default CommentLayout