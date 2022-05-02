import { useQuery, useMutation, useQueryClient } from 'react-query';

export const getCredentials = {
	method: 'GET',
	credentials: 'include',
	headers: {
		'Content-Type': 'application/json',
	},
}

export const useGetAllUsers = async () => {
	return useQuery('allUsers', () => {
		fetch(`http://localhost:3000/users`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((r) => {
			return r.data;
		});
	});
};




export async function getBug(e) {
	
	const response = await fetch(`http://localhost:3000/bugs/${e}`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response.json();
}

export const fetchAllBugs = (sortDirection, sortFilter) => {
	return fetch(`http://localhost:3000/bugs/sortOrder`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			sortDirection: sortDirection,
			sortFilter: sortFilter,
		}),
	}).then((r) => {
		return r.json();
	});
};

export function useGetAllBugs(sortDirection, sortFilter) {
    return useQuery('allBugs', () => fetchAllBugs(sortDirection, sortFilter));
}

export async function getLogin(username, password) {
	const res = await fetch(
		'http://localhost:3000/login',

		{
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: username,
				password: password,
			}),
		}
	);
	if (res.ok) {
		const data = await res.json();
		return data;
	} else {
		alert('Invalid username or password');
	}
}

export async function submitNewBug(
	issue_title,
	issue_description,
	bugPriority,
	image_url
) {
	if (issue_title !== '' && issue_description !== '') {
		console.log(
			'submitNewBug ApiCall: ',
			issue_title,
			issue_description,
			bugPriority,
			image_url
		);
		const response = await fetch(`http://localhost:3000/bugs/create`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				bug: {
					issue_title: issue_title,
					issue_description: issue_description,
					priority: bugPriority,
					image_url: image_url,
					status: 'Open',
				},
			}),
		});
		if (response.ok) {
			const data = await response.json();
			console.log('submitNewBug ApiCall: ', data);
			return data;
		}
	}
}
