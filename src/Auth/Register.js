import React, { useContext } from 'react';
import { UserContext } from '../Context/UserContext';

function Register({ userInfo, setUserInfo }) {
	const [user, setUser] = useContext(UserContext);

	function register(e) {
		e.preventDefault();
		console.log('Register > userInfo', userInfo);
		fetch(`http://localhost:3000/register`, {
			method: 'POST',
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
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('AuthContainer > register > data', data);
				setUser(data);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	return (
		<div className='w-full max-w-xs'>
			<h3>Register User:</h3>
			<form
				className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
				onSubmit={register}
			>
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

				<label className='block text-gray-700 text-sm font-bold mb-2'>
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

				<label className='block text-gray-700 text-sm font-bold mb-2'>
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

				<label className='block text-gray-700 text-sm font-bold mb-2'>
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

				<label className='block text-gray-700 text-sm font-bold mb-2'>
					Password
				</label>
				<input
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					placeholder='Password'
					value={userInfo.password}
					required={true}
					onChange={(e) => {
						setUserInfo({
							...userInfo,
							password: e.target.value,
						});
					}}
				/>

				<label className='block text-gray-700 text-sm font-bold mb-2'>
					Image URL
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
				/>

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
