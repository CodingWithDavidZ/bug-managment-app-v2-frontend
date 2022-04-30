import AppContext from '../Context/AppContext';
import {useContext} from 'react';



export const getAllUsers = async () => {
	
	const response = await fetch(`http://localhost:3000/users`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response.json();
};

export const getMe = async () => {
	const response = await fetch(`http://localhost:3000/me`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response.json();
};

export async function getBug(e) {
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
