import {
	supabase
} from "../supabase";

import {
	defineStore
} from 'pinia';

export default defineStore('tasks', {
	state: () => ({
		tasks: null
	}),
	actions: {
		async fetchTasks() {
			const {
				data: tasks
			} = await supabase
				.from('tasks')
				.select('*')
				.order('id', {
					ascending: true
				});
			this.tasks = tasks;
		}
	}
});