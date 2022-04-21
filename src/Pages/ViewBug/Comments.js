import React, { useContext, useEffect } from 'react';
import AppContext from '../../Context/AppContext';
import DateFormat from '../../Components/DateFormat';

function Comments() {
	const { bug} = useContext(AppContext);

	
	const mapComments = bug.comments.map((comment, index) => {
		return (
			<div key={`id: ${comment.id} fragment 0`}>
				<br />

				<div>
					Comment: {index + 1} of {bug.comments.length}
				</div>
				<div className='comment container' key={`id: ${comment.id} div 0`}>
					<div key={`id: ${comment.id} div 1'`}>
						<span key={`id: ${comment.id} span 0`}>Id: {comment.id}</span>
						&nbsp;&nbsp;&nbsp;
						<span key={`id: ${comment.id} span 1`}>
							Bug Id: {comment.bug_id}
						</span>
						&nbsp;&nbsp;&nbsp;
						<span key={`id: ${comment.id} span 2`}>
							User: {comment.created_by}
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
			</div>
		);
	});

	return <div>{mapComments}</div>;
}

export default Comments;
