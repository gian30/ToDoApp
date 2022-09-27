<template>
	<div>
		<TasksListComponent />
		<AddTaskComponent />
		<TaskDialogComponent />
	</div>
</template>
<script setup>
import Task from '../store/task'
import User from '../store/user'

</script>
<script>
import { mapActions, mapState } from 'pinia'
import TasksListComponent from '../components/TaskListComponent.vue'
import TaskDialogComponent from '../components/TaskDialogComponent.vue'
import AddTaskComponent from '../components/AddTaskComponent.vue'

export default {
	components: {
		TasksListComponent,
		TaskDialogComponent,
		AddTaskComponent
	},
	methods: {
		...mapActions(Task, ['fetchTasks']),
	},
	created() {
		this.fetchTasks()
	}, 
	computed: {
		...mapState(Task, ['tasks']),
		...mapState(User, ['currentUser']),
	},
}
</script>
<style>
</style>