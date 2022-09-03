import {
	createRouter,
	createWebHistory
} from 'vue-router';

const routes = [

	{
		path: '/',
		name: 'root',
		component: () => import( /* webpackChunkName: 'index' */ './components/AuthComponent.vue')
	},
];
const router = createRouter({
	history: createWebHistory('/'),
	routes,
	scrollBehavior() {
		document.getElementById('app').scrollIntoView();
	}
});
export default router;