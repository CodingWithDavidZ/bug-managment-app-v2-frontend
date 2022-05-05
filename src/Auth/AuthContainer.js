import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

function AuthContainer() {
	const [userInfo, setUserInfo] = useState({
		username: '',
		first_name: '',
		last_name: '',
		avatar: '',
		password: '',
		email: '',
		is_team_lead: false,
	});
	const [authType, setAuthType] = useState('');

	function renderRegisterAuth() {
		setAuthType('register');
	}

	function renderLoginAuth() {
		setAuthType('login');
	}

	function renderAuthMethod(authMethod) {
		switch (authMethod) {
			case 'login':
				return <Login className='content-center' />;
			case 'register':
				return <Register userInfo={userInfo} setUserInfo={setUserInfo} />;
			default:
				return <Login className='content-center' />;
		}
	}

	return (
		<>
			<div className='grid grid-cols-3 gap-1 content-start'>
				<div className='col-start-2 col-end-2'>
					<div className='col-start-1 col-end-1 pt-16'>
						<button
							className='bg-red-700 w-1/3 rounded border hover:animate-pulse'
							onClick={renderRegisterAuth}
						>
							Register
						</button>
						<button
							className='bg-green-700 w-1/3 rounded border hover:animate-pulse'
							onClick={renderLoginAuth}
						>
							Login
						</button>
					</div>
					<div className=''>
						<br />
						{renderAuthMethod(authType)}
					</div>
				</div>
			</div>
		</>
	);
}

export default AuthContainer;
