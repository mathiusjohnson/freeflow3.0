import Login from '../Pages/Login';
import Dashboard from '../Pages/Dashboard';
// import NotFound from '../Pages/NotFound';
import Profile from '../Pages/Profile'
import Messages from '../Pages/Messages'
import Users from '../Pages/Users'
import Register from '../Pages/Register'
const routes = [
	{
		path: '/login',
		component: Login,
		// isPrivate: false,
	},
	{
		path: '/register',
		component: Register,
		// isPrivate: false,
	},
	{
		path: '/dashboard',
		component: Dashboard,
		// isPrivate: false,
	},
	{
		path: '/users',
		component: Users,
		// isPrivate: false,
	},
	{
		path: '/profile',
		component: Profile,
		// isPrivate: false,
	},
	{
		path: '/messages',
		component: Messages,
		// isPrivate: false,
	},
];

export default routes;