<template>
	<HeaderComponent></HeaderComponent>
	<router-view />
</template>

<script>
import { mapActions, mapState } from 'pinia'
import User from './store/user';
import HeaderComponent from './components/HeaderComponent.vue';

export default {
	name: 'App',
	components: {
		HeaderComponent
	},
	methods: {
		...mapActions(User, ['fetchUser'])
	},
	computed: {
		...mapState(User, ['currentUser'])
	},
	created() {
		this.fetchUser();
	}
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	width: 400px;
	margin: 0 auto;
	display: block;
}
</style>
