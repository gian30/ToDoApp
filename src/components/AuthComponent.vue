<template>
	<form class="row flex-center flex" @submit.prevent="handleLogin">
		<div class="col-6 form-widget">
			<h1 class="header">{{!registerMode ? 'Log in' : 'Register'}}</h1>
			<p class="description">Sign in via magic link with your email below</p>
			<div>
				<el-input class="auth-input" type="email" placeholder="Your email" v-model="email" />
				<el-input class="auth-input" type="password" placeholder="Your password" v-model="password" />
				<el-input class="auth-input" type="password" placeholder="Verify password" v-model="verifyPassword" v-if="registerMode" />

			</div>
			<div>
				<el-button native-type="submit" class="button block" :disabled="loading">{{loading ? 'Loading' :
				(!registerMode ? 'Log in' : 'Register') }}</el-button>
			</div>
		</div>
	</form>
	<el-button link @click="switchRegisterMode()">{{registerMode ? 'Already registered? Log in' : 'Not registered user?	Sign up'}}</el-button>
</template>
<script>
import { ref } from 'vue'
import { supabase } from '../supabase'
import useUser from '../store/user';

import router from '@/router'

export default {
	methods: {
		switchRegisterMode() {
			this.registerMode = !this.registerMode
		},
	},
	setup() {
		const loading = ref(false)
		const registerMode = ref(true)
		const { fetchUser } = useUser()
		const email = ref('')
		const password = ref('')
		const verifyPassword = ref('')
		const handleLogin = async () => {
			if (registerMode.value && password.value !== verifyPassword.value) {
				console.log('Passwords do not match')
				alert('Passwords do not match')
				return
			} else if (password.value.length < 8) {
				console.log('Password must be at least 8 characters')
				alert('Password must be at least 8 characters')
				return
			}

			let userValue = null
			try {

				loading.value = true
				let errorValue = null
				if (registerMode.value) {
					const { error } = await supabase.auth.signUp({ email: email.value, password: password.value }, { shouldCreateUser: registerMode.value })
					errorValue = error
				} else {
					const { user, error } = await supabase.auth.signIn({ email: email.value, password: password.value }, { shouldCreateUser: registerMode.value })
					errorValue = error
					userValue = user
				}
				if (errorValue) throw errorValue
				if (registerMode.value) {
					alert('Check your email for the confirmation link!')
				} else {
					if (userValue) {
						registerMode.value = false;
					} else {
						alert('Something went wrong...')
					}
				}
			} catch (error) {
				alert(error.error_description || error.message)
			} finally {
				loading.value = false
				if (userValue !== null) {
					console.log('userValue', userValue);

					fetchUser()
					router.push('/')
				}
			}
		}

		return {
			loading,
			email,
			password,
			verifyPassword,
			handleLogin,
			registerMode
		}
	},
}
</script>
<style>
	.auth-input {
		margin-bottom: 10px;
	}
</style>