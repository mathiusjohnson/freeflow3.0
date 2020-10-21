// const ROOT_URL = 'https://secret-hamlet-03431.herokuapp.com';
const ROOT_URL = 'https://stack-network.herokuapp.com/api/login-real';

export async function loginUser(dispatch, loginPayload) {
	console.log("payload: ", loginPayload);
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(loginPayload),
	};

	console.log("request options in actions.jsx: ", requestOptions);

	try {
		dispatch({ type: 'REQUEST_LOGIN' });
		let response = await fetch(`${ROOT_URL}`, requestOptions);
		let data = await response.json();
		data = data[0]
		console.log("data in dispatch actions.jsx: ", data);
		if (data.username) {
			dispatch({ type: 'LOGIN_SUCCESS', payload: data });
			localStorage.setItem('currentUser', JSON.stringify(data));
			return data;
		}

		dispatch({ type: 'LOGIN_ERROR', error: data.errors[0] });
		console.log(data.errors[0]);
		return;
	} catch (error) {
		dispatch({ type: 'LOGIN_ERROR', error: error });
		console.log(error);
	}
}

export async function logout(dispatch) {
	dispatch({ type: 'LOGOUT' });
	localStorage.removeItem('currentUser');
	localStorage.removeItem('token');
}