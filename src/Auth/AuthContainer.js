import React, { useContext, useState } from 'react';
import Login from './Login';
import Register from './Register';
import { UserContext } from '../Context/UserContext';

function AuthContainer() {
	const [user, setUser] = useContext(UserContext);
	const [registerEmail, setRegisterEmail] = useState('');
	const [registerPassword, setRegisterPassword] = useState('');
	const [loginEmail, setLoginEmail] = useState('');
	const [loginPassword, setLoginPassword] = useState('');
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

	// TODO: Handle login errors on browser

	function renderAuthMethod(authMethod) {
		switch (authMethod) {
			case 'login':
				return (
					<Login
						setUser={setUser}
						loginEmail={loginEmail}
						loginPassword={loginPassword}
						setLoginEmail={setLoginEmail}
						setLoginPassword={setLoginPassword}
					/>
				);
			case 'register':
				return (
					<Register
						setUser={setUser}
						registerEmail={registerEmail}
						registerPassword={registerPassword}
						setRegisterEmail={setRegisterEmail}
						setRegisterPassword={setRegisterPassword}
						userInfo={userInfo}
						setUserInfo={setUserInfo}
					/>
				);
			default:
				return (
					<Login
						setUser={setUser}
						loginEmail={loginEmail}
						loginPassword={loginPassword}
						setLoginEmail={setLoginEmail}
						setLoginPassword={setLoginPassword}
					/>
				);
		}
	}

	return (
		<>
			<div className='grid grid-cols-12 gap-1 content-start'>
				<button
					className='bg-red-700 rounded border hover:animate-pulse'
					onClick={renderRegisterAuth}
				>
					Register
				</button>
				<button
					className='bg-green-700 rounded border hover:animate-pulse'
					onClick={renderLoginAuth}
				>
					Login
				</button>
			</div>
			<div>{renderAuthMethod(authType)}</div>
		</>
	);
}

export default AuthContainer;
