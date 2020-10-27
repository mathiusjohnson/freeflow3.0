import React from 'react';
import { useAuthDispatch, logout, useAuthState } from '../Context';
import { NavLink } from 'react-router-dom';
import styles from '../Pages/Dashboard/dashboard.module.css';

const Navigation = props => {
	const dispatch = useAuthDispatch();
	const userDetails = useAuthState();
	console.log('user details in navigation: ', userDetails.user);

	const handleLogout = () => {
		logout(dispatch);
		// props.history.push('/login');
	};
	if (!userDetails) return null;
	return (
		<div>
			<NavLink to="/dashboard">Home</NavLink>
			<NavLink
				to={{
					pathname: '/messages/',
					state: { username: userDetails.user },
				}}
			>
				Messages
			</NavLink>
			<NavLink to="/profile">Profile</NavLink>
			<NavLink to="/users">Users</NavLink>
			<NavLink to="/login">Login</NavLink>
			<NavLink to="/register">Register</NavLink>
			{userDetails.user === undefined || userDetails.user === '' ? (
				''
			) : (
				<button className={styles.logoutBtn} onClick={handleLogout}>
					Logout
				</button>
			)}
		</div>
	);
};

export default Navigation;
