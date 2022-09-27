


<template>
	<div class="common-layout">
		<el-container>
			<el-header>
				<HeaderComponent></HeaderComponent>
			</el-header>
			<el-main style="padding: 0">
				<router-view />
			</el-main>
		</el-container>
	</div>
</template>


<script>
import { mapActions, mapState } from 'pinia'
import User from './store/user';
import HeaderComponent from './components/HeaderComponent.vue';

export default {
	name: 'App',
	components: {
		HeaderComponent,

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
	html {
		background-color: #fff;
	}
body {
	margin: 0;
	padding: 0;
	position: fixed; left: 0; top: 0; right: 0; bottom: 0;
	touch-action:none;
	background: #fff;
}

.common-layout {
	width: 400px;
	width: 400px;
	margin: 0 auto;
	display: block;
}
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;

}
</style>
