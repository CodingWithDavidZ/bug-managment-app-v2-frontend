import React, { useEffect, useState, useContext } from 'react';
import ViewBug from './ViewBug';
import AppContext from '../../Context/AppContext';

function ViewBugContainer() {
	const { selectedBug } = useContext(AppContext);

	console.log('selectedBug', selectedBug);

	
	return (
		<div>
			<ViewBug />
		</div>
	);
}

export default ViewBugContainer;
