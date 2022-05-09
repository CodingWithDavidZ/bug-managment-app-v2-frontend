import React, { useContext, useState } from 'react';
import AppContext from '../Context/AppContext';

function Login() {
	const { setUser } = useContext(AppContext);
	const [userLogin, setUserLogin] = useState({
		username: '',
		password: '',
	});

	async function login(e) {
		e.preventDefault();
		const res = await fetch(
			'http://localhost:3000/login',

			{
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: userLogin.username,
					password: userLogin.password,
				}),
			}
		);
		if (res.ok) {
			const data = await res.json();
			setUser(data);
		} else {
			alert('Invalid username or password');
			setUserLogin({
				username: '',
				password: '',
			});
		}
	}

	return (
		<div className='w-full max-w-xs grid '>
			<h3>Login User:</h3>
			<form className='pt-3 ' onSubmit={login}>
				<label className=' block text-gray-700 text-sm font-bold mb-2'>
					Username
				</label>
				<input
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					required={true}
					placeholder='Username'
					value={userLogin.username}
					onChange={(e) => {
						setUserLogin({
							...userLogin,
							username: e.target.value,
						});
					}}
				/>

				<label className='pt-3 block text-gray-700 text-sm font-bold mb-2'>
					Password
				</label>
				<input
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					required={true}
					type='password'
					placeholder='Password'
					value={userLogin.password}
					onChange={(e) => {
						setUserLogin({
							...userLogin,
							password: e.target.value,
						});
					}}
				/>
				<div className='pt-3 ' />
				<button
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
					type='submit'
				>
					Login User
				</button>
			</form>
		</div>
	);
}

export default Login;
