import React, { useState } from 'react';
const RegisterFirstName = () => {
	const [errorMsg, setErrorMsg] = useState('');
	const [lastName, setLastName] = useState('');

	function setError() {
		if (!lastName) {
			setErrorMsg(true);
		} else {
			setErrorMsg(false);
		}
	}
	return (
		<div className="register-lastname-container">
			<div className="lastname-title register-title">Last Name:</div>
			<div className="lastname-input">
				<input
					type="text"
					className="register-input"
					id="lastname-input"
					onChange={e => setLastName(e.target.value)}
					value={lastName}
					onBlur={() => setError()}
				/>
			</div>
			<div className="lastname-error register-error">
				{errorMsg && 'Last name cannot be empty!'}
			</div>
		</div>
	);
};

export default RegisterFirstName;
