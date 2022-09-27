import useUser  from '@/store/user'
import {
	createRouter,
	createWebHistory
} from 'vue-router';


const routes = [

	{
		path: '/auth',
		meta: {
			requiresNotAuth: true
		},
		component: () => import( /* webpackChunkName: 'index' */ './pages/LoginPage.vue')
	},
	{
		path: '/',
		name: 'root',
		meta: {
			requiresAuth: true
		},
		component: () => import( /* webpackChunkName: 'index' */ './pages/TasksPage.vue')
	},
];
const router = createRouter({
	history: createWebHistory('/'),
	routes,
	scrollBehavior() {
		document.getElementById('app').scrollIntoView();
	}
});
router.beforeEach((to) => {
	const user = useUser()
	// this route requires auth, check if logged in
	if (to.meta.requiresAuth && Object.keys({...user.currentUser}).length === 0 ) {
		console.log('user is not logged in', {...user.currentUser});
		// redirect to login page.
		return {
			path: '/auth',
		
		}
	}
	// this route requires to be not authenticated
	if(to.meta.requiresNotAuth && Object.keys({...user.currentUser}).length !== 0){
		console.log('user is logged in', {...user.currentUser});
		// redirect to home page
		return {
			path: '/',
		}
	}
})

export default router;