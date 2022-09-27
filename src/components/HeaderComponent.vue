<template>
	<el-drawer v-model="drawer" size="100%" v-if="currentUser">
		<el-button link class="logout" @click="logout()">Logout</el-button>
	</el-drawer>

	<div class="flex items-center" v-if="currentUser">
		<el-button link>
			<el-avatar @click="drawer = true" class="mr-3" :size="32"
				src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
		</el-button>

	</div>

</template>

<script>
import { supabase } from '@/supabase'
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
		async logout() {
			await supabase.auth.signOut()
			this.unsetUser()
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
	margin-left: auto;
}
</style>