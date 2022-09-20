import { supabase } from "../supabase";

import {
	defineStore
} from 'pinia';

export default defineStore('user', {
	state: () => {
		return {
			user: null,
		}
	},
	actions: {
		async fetchUser() {
			const response = await supabase.auth.user();
			this.setUser(response);
		},
		setUser(user) {
			this.user = user;
		},
		unsetUser() {
			this.user = null;
		}
	},
	getters: {
		currentUser() {
			return this.user;
		},
	},

});