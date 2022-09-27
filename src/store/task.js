import { defineStore } from 'pinia';

import { supabase } from "../supabase";

export default defineStore('tasks', {
	state: () => ({
		tasks: null,
		dialogVisible: false,
		editTaskIndex: null,
		editTaskMode: false,
		textarea: "",
		currentTask: null,
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
		},
		openEditTaskDialog(index) {
			this.editTaskIndex = index
			this.editTaskMode = true
			this.textarea = this.tasks[index].title
			this.dialogVisible = true
			this.currentTask = this.tasks[index]
		},
		openAddTaskDialog() {
			this.textarea = ''
			this.editTaskMode = false
			this.dialogVisible = true
			this.currentTask = null
		},

		closeDialog() {
			this.dialogVisible = false
		}

	}
});