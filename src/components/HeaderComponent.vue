<template>
	<div class="container">

		<button class="logout" @click="logout()" v-if="currentUser">Logout</button>

	</div>
</template>

<script>
import { supabase } from '@/supabase'
import User from '../store/user';
import router from '@/router';
import { mapActions, mapState } from 'pinia';
export default {
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