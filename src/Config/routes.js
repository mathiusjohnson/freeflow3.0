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
		isPrivate: false,
	},
	{
		path: '/register',
		component: Register,
		isPrivate: true,
	},
	{
		path: '/dashboard',
		component: Dashboard,
		isPrivate: true,
	},
	{
		path: '/users',
		component: Users,
		isPrivate: true,
	},
	{
		path: '/profile',
		component: Profile,
		isPrivate: true,
	},
	{
		path: '/messages',
		component: Messages,
		isPrivate: true,
	},
];

export default routes;