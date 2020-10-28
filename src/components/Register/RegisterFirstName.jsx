import React, { useState } from 'react';
const RegisterFirstName = () => {
	const [errorMsg, setErrorMsg] = useState('');
	const [firstName, setFirstName] = useState(false);

	function setError() {
		if (!firstName) {
			setErrorMsg(true);
		} else {
			setErrorMsg(false);
		}
	}
	return (
		<div className="register-firstname-container">
			<div className="firstname-title register-title">First Name:</div>
			<div className="firstname-input">
				<input
					type="text"
					className="register-input"
					id="firstname-input"
					onChange={e => setFirstName(e.target.value)}
					value={firstName}
					onBlur={() => setError()}
				/>
			</div>
			<div className="firstname-error register-error">
				{errorMsg && 'First name cannot be empty!'}
			</div>
		</div>
	);
};

export default RegisterFirstName;
