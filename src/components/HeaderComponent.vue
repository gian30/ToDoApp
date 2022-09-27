<template>
	<el-drawer v-model="drawer" size="100%" v-if="currentUser">
		<div>
			<el-avatar @click="drawer = true" class="mr-3" :size="52"
				src="/face_with_cowboy_hat.png" />
		</div>
		<div>
			<span>{{currentUser.email}}</span>
		</div>
		<div>
			<el-button link class="logout" @click="logoutUser()">Sign out</el-button>
		</div>
	</el-drawer>

	<div class="flex items-center" v-if="currentUser">
		<el-button link>
			<el-avatar @click="drawer = true" class="mr-3" :size="32" :fit="'scale-down'" shape="circle"
				src="/face_with_cowboy_hat.png" />
		</el-button>

	</div>

</template>

<script>

import User from '../store/user';
import router from '@/router';
import { mapActions, mapState } from 'pinia';

export default {
	data() {
		return {
			drawer: false,
		}
	},
	methods: {
		...mapActions(User, ['unsetUser']),
		...mapActions(User, ['logout']),
		async logoutUser() {
			await this.logout()
			router.push('/auth')
		}
	},
	computed: {
		...mapState(User, ['currentUser'])
	},
}
</script>

<style>
.logout {
	display: block;
	margin: auto;
	margin-top: 15px;
}
</style>