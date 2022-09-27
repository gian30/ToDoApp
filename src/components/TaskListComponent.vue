<template>
	<el-table :data="tasks" height="calc(100vh - 100px)">
		<el-table-column width="40px" align="left">
			<template #default="scope">
				<el-checkbox v-model="tasks[scope.$index].is_complete" size="large"
					@click.prevent="markIsComplete(scope.$index, tasks[scope.$index].is_complete)" />
			</template>
		</el-table-column>
		<el-table-column prop="title" label="" width="210px" />
		<el-table-column align="right" label="">
			<template #default="scope">
				<el-button :icon="Edit" circle @click.prevent="openEditTaskDialog(scope.$index)" />
				<el-button :icon="Delete" circle @click.prevent="remove(scope.$index)" />
			</template>
		</el-table-column>
	</el-table>

</template>
<script setup>
import Task from '../store/task'
import {
	Delete, Edit
} from '@element-plus/icons-vue'
</script>
<script>

import { mapActions, mapState } from 'pinia'

export default {
	computed: {
		...mapState(Task, ['tasks']),
	},
	methods: {
		...mapActions(Task, ['openEditTaskDialog']),
		...mapActions(Task, ['remove']),
		...mapActions(Task, ['update']),
		async markIsComplete(index, is_complete) {
			const task = this.tasks[index]
			task.is_complete = !is_complete
			this.update(task, index)
		},
	},
}
</script>
<style>
.circle-button-add {
	position: relative;
	bottom: 10px;
	z-index: 99;
}
</style>