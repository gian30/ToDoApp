import { defineStore } from 'pinia';

import { supabase } from "../supabase";

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
		},
		async add(task) {
			await supabase.from('tasks').insert([task])
			this.tasks.push(task)
		},
		async update(task, index) {
			await supabase.from('tasks').update(task).eq('id', task.id)
			this.tasks[index] = task	
		},
		async remove(index) {
			await supabase.from('tasks').delete().eq('id', this.tasks[index].id)
			this.tasks.splice(index, 1)
		}
	}
});