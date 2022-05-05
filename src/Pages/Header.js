import React, { useContext } from 'react';
import AppContext from '../Context/AppContext';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
	const { user, setUser } = useContext(AppContext);
	const navigate = useNavigate();

	async function logoutOfServer() {
		const res = await fetch('http://localhost:3000/logout', {
			method: 'DELETE',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (res.ok) {
			alert('Logged out');
			setUser({});
			navigate('/');
		} else {
			alert('logout failed');
		}
	}

	return (
		<header className='text-gray-600 body-font'>
			<div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
				<div className='flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0'>
					<h1 className='font-bold underline underline-offset-2'>Welcome:</h1>
					<span className='text-base '>
						{user.username
							? ` \u00A0${user.username}`
							: '\u00A0 Please Login or Register'}
					</span>
				</div>
				{user.id ? ( // if user is logged in gives access to Navbar
					<nav className='md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center'>
						<Link
							className='mr-5 hover:text-gray-900 hover:border-gray-600 hover:border-2 hover:pl-1 hover:pr-1 hover:rounded-md cursor-pointer font-bold'
							to='/'
						>
							Home
						</Link>
					</nav>
				) : (
					<nav className='md:mr-auto md:ml-4 md:py-1 md:pl-4 	flex flex-wrap items-center text-base justify-center'>
						<p className='mr-5 hover:text-gray-900 hover:border-gray-600 hover:border-2 hover:rounded-md cursor-pointer'></p>
						<p className='mr-5 hover:text-gray-900 hover:border-gray-600 hover:border-2 hover:rounded-md cursor-pointer'></p>
						<p className='mr-5 hover:text-gray-900 hover:border-gray-600 hover:border-2 hover:rounded-md cursor-pointer'></p>
						<p className='mr-5 hover:text-gray-900 hover:border-gray-600 hover:border-2 hover:rounded-md cursor-pointer'></p>
					</nav>
				)}
				<button
					className='inline-flex items-center bg-red-400 border-0 py-1 px-3 focus:outline-none hover:bg-red-600 rounded hover:text-white text-base mt-4 md:mt-0'
					onClick={logoutOfServer}
				>
					Logout
					<svg
						fill='none'
						stroke='currentColor'
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						className='w-4 h-4 ml-1'
						viewBox='0 0 24 24'
					>
						<path d='M5 12h14M12 5l7 7-7 7'></path>
					</svg>
				</button>
			</div>
		</header>
	);
}

export default Header;
