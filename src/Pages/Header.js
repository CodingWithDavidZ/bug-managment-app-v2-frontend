import React, { useContext } from 'react';
import { UserContext } from '../Context/UserContext';

function Header() {
	const [user, setUser] = useContext(UserContext);

	// const logout = async () => {
	// 	logoutOfServer();
	// 	setUser({});
	// };

	async function logoutOfServer(e) {
		e.preventDefault();
		await fetch('localhost:3000/logout', { method: 'DELETE' }).then((r) => {
			if (r.status === 200) {
				console.log('logout of server successful');
				setUser({});
			} else {
				console.log('logout of server failed');
			}
		});
	}

	// display welcome if user is logged in and display "please login" if user is not logged in

	function displayWelcome() {
		// TODO: not displaying properly
		console.log('Header/displayWelcome: user', user);
		if (user.id !== undefined) {
			return (
				<h3 className='col-start-1 col-auto text-white'>
					Welcome: {user.username}
				</h3>
			);
		} else {
			return (
				<h3 className='col-start-1 col-auto text-white'>
					Please Login or Register
				</h3>
			);
		}
	}

	return (
		<header className='text-gray-600 body-font'>
			<div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
				<a className='flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0'>
					<h1>Welcome:</h1>
					<span className='ml-3 text-xl'>{user.username}</span>
				</a>
				{user.id ? (
					<nav className='md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center'>
						<a className='mr-5 hover:text-gray-900 hover:border-gray-600 hover:border-2 hover:rounded-md cursor-pointer'>
							Home
						</a>
						<a className='mr-5 hover:text-gray-900 hover:border-gray-600 hover:border-2 hover:rounded-md cursor-pointer'>
							Second Link
						</a>
						<a className='mr-5 hover:text-gray-900 hover:border-gray-600 hover:border-2 hover:rounded-md cursor-pointer'>
							Third Link
						</a>
						<a className='mr-5 hover:text-gray-900 hover:border-gray-600 hover:border-2 hover:rounded-md cursor-pointer'>
							Fourth Link
						</a>
					</nav>
				) : null}
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
