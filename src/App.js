import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import routes from './Config/routes.js';
import { AuthProvider } from './Context';
import AppRoute from './components/AppRoute';
import Navigation from './components/Navigation'
import useApplicationData from "./hooks/useApplicationData";

function App() {
	const {
    state,
    createPost,
    addLike,
    createComment,
    removeLike,
    removeComment,
    editComment,
    filterDashboardPosts,
    deletePost,
    updatePost,
  } = useApplicationData();
	return (
		<AuthProvider>
			<Router>
			<Navigation 
			/>
				<Switch>
					{routes.map((route) => (
						<AppRoute
							key={route.path}
							path={route.path}
							component={route.component}
							isPrivate={route.isPrivate}
							state={state}
						/>
					))}
				</Switch>
			</Router>
		</AuthProvider>
	);
}

export default App;