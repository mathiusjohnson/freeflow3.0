import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RegisterUsername from '../../components/Register/RegisterUsername';
import RegisterEmail from '../../components/Register/RegisterEmail';
import RegisterPassword from '../../components/Register/RegisterPassword';
import RegisterAvatarList from '../../components/Register/RegisterAvatarList';
import RegisterFirstName from '../../components/Register/RegisterFirstName';
import RegisterLastName from '../../components/Register/RegisterLastName';
import '../../styles/register.css';

export default function Register() {
	const [avatarList, setAvatarList] = useState([]);
	const [randomUsernameList, setRandomUsernameList] = useState([]);
	const [selectedAvatarUrl, setSelectedAvatarUrl] = useState('');
	const [showAvatarList, setShowAvatarList] = useState(false);
	const [submitError, setSubmitError] = useState('');
	const [submitSuccess, setSubmitSuccess] = useState(false);

	useEffect(() => {
		const promiseAvatars = axios.get(
			'http://localhost:8001/api/register/avatars'
		);
		const promiseRandomUsernames = axios.get(
			'http://localhost:8001/api/register/random_usernames'
		);

		Promise.all([promiseAvatars, promiseRandomUsernames]).then(all => {
			const [avatarData, randomUsernameData] = all;
			const uniqueAvatars = [...new Set(avatarData.data)];
			const uniqueRandomUsernames = [...new Set(randomUsernameData.data)];

			setAvatarList(uniqueAvatars);
			setRandomUsernameList(uniqueRandomUsernames);
		});
	}, []);

	function selectAvatar(avatarUrl) {
		setSelectedAvatarUrl(avatarUrl);
	}

	function toggleAvatarList() {
		!showAvatarList ? setShowAvatarList(true) : setShowAvatarList(false);
	}

	// ERROR HANDLING ON SUBMIT
	function handleSubmit() {
		setSubmitError('');
		const registerErrors = document.querySelectorAll('.register-error');
		for (let error of registerErrors) {
			if (error.textContent) {
				setSubmitError('Please check error messages before submitting!');
				return;
			}
		}
		const userInputs = document.querySelectorAll('.register-input');
		for (let input of userInputs) {
			if (!input.value.length) {
				setSubmitError('At least one field is left blank!');
				return;
			}
		}
		const avatarSrc = document.querySelector('.selected-avatar').children[0]
			.src;
		if (avatarSrc === 'http://localhost:8000/register') {
			setSubmitError('Please select avatar!');
			return;
		}

		const usernameInput = document.querySelector('#username-input').value;
		const lastnameInput = document.querySelector('#lastname-input').value;
		const firstnameInput = document.querySelector('#firstname-input').value;
		const emailInput = document.querySelector('#email-input').value;
		const passwordInput = document.querySelector('#password-input').value;

		axios
			.post('http://localhost:8001/api/register/new', {
				usernameInput,
				firstnameInput,
				lastnameInput,
				emailInput,
				passwordInput,
				avatarSrc,
			})
			.then(res => {
				setSubmitSuccess(true);

				setTimeout(() => {
					setSubmitSuccess(false);
				}, 3000);
			});
	}

	return (
		<div className="register-main-container">
			<div className="register-main-title">Sign up for FreeFlow!</div>
			<RegisterUsername randomUsernameList={randomUsernameList} />
			<RegisterFirstName />
			<RegisterLastName />
			<RegisterEmail />
			<RegisterPassword confirmPassword={false} />
			<RegisterPassword confirmPassword={true} />
			<RegisterAvatarList
				avatarList={avatarList}
				selectAvatar={selectAvatar}
				selectedAvatarUrl={selectedAvatarUrl}
				toggleAvatarList={toggleAvatarList}
				showAvatarList={showAvatarList}
			/>
			<div className="register-btn-container">
				<div className="register-btn" onClick={() => handleSubmit()}>
					REGISTER
				</div>
				<div className="submit-error-container">
					{submitError && submitError}
				</div>
				<div className="submit-success-container">
					{submitSuccess && 'Registration successful!'}
				</div>
			</div>
		</div>
	);
}
