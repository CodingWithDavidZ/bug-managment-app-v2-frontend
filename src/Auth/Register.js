import React, { useContext } from 'react';
import AppContext from '../Context/AppContext';
import { useQueryClient } from 'react-query';

function Register({ userInfo, setUserInfo }) {
	const { setUser } = useContext(AppContext);
	const queryClient = useQueryClient();

	function removeFirstWord(str) {
		const indexOfSpace = str.indexOf(' ');

		if (indexOfSpace === -1) {
			return '';
		}

		return str.substring(indexOfSpace + 1);
	}

	function register(e) {
		e.preventDefault();
		fetch(`http://server.bug-management.codingwithdavidz.com/register`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				user: {
					username: userInfo.username,
					first_name: userInfo.first_name,
					last_name: userInfo.last_name,
					email: userInfo.email,
					is_team_lead: false,
					avatar: userInfo.avatar,
					password: userInfo.password,
				},
			}),
		}).then((r) => {
			if (r.ok) {
				r.json().then((data) => {
					setUser(data);
					queryClient.invalidateQueries('allUser');
				});
			} else {
				r.json().then((data) => {
					if (data.errors.toString() === 'Email Email invalid') {
						const string = data.errors.toString();
						alert(`${removeFirstWord(string)} Please try again.`);
					} else {
						alert(`${data.errors} Please try again.`);
					}
				});
			}
		});
	}

	// .then((response) => response.json())
	// .then((data) => {
	// 	setUser(data);
	// })
	// .catch((error) => {
	// 	alert(error);
	// });

	return (
		<div className='w-full max-w-xs'>
			<h3>Register User:</h3>
			<form className=' pt-3 pb-8 mb-4' onSubmit={register}>
				<label className='block text-gray-700 text-sm font-bold mb-2'>
					Username
				</label>
				<input
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					placeholder='Username'
					required={true}
					value={userInfo.username}
					onChange={(e) => {
						setUserInfo({
							...userInfo,
							username: e.target.value,
						});
					}}
				/>

				<label className='block text-gray-700 text-sm font-bold mb-2 pt-3'>
					First Name
				</label>
				<input
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					placeholder='First Name'
					value={userInfo.first_name}
					required={true}
					onChange={(e) => {
						setUserInfo({
							...userInfo,
							first_name: e.target.value,
						});
					}}
				/>

				<label className=' pt-3 block text-gray-700 text-sm font-bold mb-2'>
					Last Name
				</label>
				<input
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					placeholder='Last Name'
					value={userInfo.last_name}
					required={true}
					onChange={(e) => {
						setUserInfo({
							...userInfo,
							last_name: e.target.value,
						});
					}}
				/>

				<label className='pt-3 block text-gray-700 text-sm font-bold mb-2'>
					Email
				</label>
				<input
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					placeholder='Email'
					value={userInfo.email}
					required={true}
					onChange={(e) => {
						setUserInfo({
							...userInfo,
							email: e.target.value,
						});
					}}
				/>

				<label className='pt-3 block text-gray-700 text-sm font-bold mb-2'>
					Password
				</label>
				<input
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					placeholder='Password'
					type='password'
					value={userInfo.password}
					required={true}
					onChange={(e) => {
						setUserInfo({
							...userInfo,
							password: e.target.value,
						});
					}}
				/>
				{/* Add Later if you decide to implement avatar usage */}
				{/* <label className=' pt-3 block text-gray-700 text-sm font-bold mb-2'>
					Avatar
				</label>
				<input
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					placeholder='Image URL'
					value={userInfo.avatar}
					onChange={(e) => {
						setUserInfo({
							...userInfo,
							avatar: e.target.value,
						});
					}}
				/> */}
				<div className='pt-3' />
				<button
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
					type='submit'
				>
					Create User
				</button>
			</form>
		</div>
	);
}

export default Register;
