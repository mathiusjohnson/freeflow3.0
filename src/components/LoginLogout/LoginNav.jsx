import React, { useState } from 'react';
import styles from '../../Pages/Login/NewLogin.scss';
import { loginUser, useAuthState, useAuthDispatch } from '../../Context';

export default function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
	
	const dispatch = useAuthDispatch();
	const { loading, errorMessage } = useAuthState();

  const handleLogin = () => {

			let response = loginUser(dispatch, { username, password });
			if (response.user) return;
			// props.history.push('/dashboard');
		} 
	
    return (
			<div>
			<div>
				{errorMessage ? <p className={styles.error}>{errorMessage}</p> : null}
				<form>
					<div className={styles.loginForm}>
						<div className={styles.loginFormItem}>
							<label htmlFor='email'>Username</label>
							<input
								type='text'
								id='email'
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								disabled={loading}
							/>
						</div>
						<div className={styles.loginFormItem}>
							<label htmlFor='password'>Password</label>
							<input
								type='password'
								id='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								disabled={loading}
							/>
						</div>
					</div>
					<button onClick={handleLogin} disabled={loading}>
						login
					</button>
				</form>
			</div>
		</div>
    )
}