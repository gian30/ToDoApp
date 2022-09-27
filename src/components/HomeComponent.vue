<template>

	<div>
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
					<el-button :icon="Delete" circle @click.prevent="removeTask(scope.$index)" />
				</template>
			</el-table-column>
		</el-table>
		<el-button class="circle-button-add" type="primary" :icon="Plus" circle size="large"
			@click="openAddTaskDialog()" />
		<el-dialog v-model="dialogVisible" :title="editTaskMode ? 'Edit task' : 'Add task'" width="350px"
			:before-close="handleClose">
			<el-input v-model="textarea" maxlength="30" minlength="5" placeholder="Please input" :validate-event="true" type="textarea" show-word-limit />
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogVisible = false">Cancel</el-button>
					<el-button type="primary" @click="saveClick()" :disabled="!textareaValid">Confirm</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
<script setup>
import Task from '../store/task';
import User from '../store/user';
import {
	Plus, Delete, Edit
} from '@element-plus/icons-vue'
</script>
<script>

import { mapActions, mapState } from 'pinia'
import { supabase } from '@/supabase';

export default {

	data() {
		return {
			dialogVisible: false,
			textarea: '',
			editTaskMode: false,
			editTaskIndex: -1,
		}
	},
	methods: {
		...mapActions(Task, ['fetchTasks']),
		saveClick() {
			if (this.editTaskMode) {
				this.editTask()
			} else {
				this.addTask();
			}
			
			this.dialogVisible = false;
		},
		async addTask() {
			this.tasks.push({
				title: this.textarea,
				is_complete: false
			})
			await supabase.from('tasks').insert([{
				title: this.textarea,
				is_complete: false,
				user_id: this.currentUser.id
			}])
		},
		async editTask() {
			if (this.editTaskIndex === -1 || !this.tasks[this.editTaskIndex] || this.editTaskMode === false) {
				return;
			}
			console.log(this.tasks[this.editTaskIndex])
			await supabase.from('tasks').update({
				title: this.textarea
			}).eq('id', this.tasks[this.editTaskIndex].id)
			this.tasks[this.editTaskIndex].title = this.textarea
	
		},
		openAddTaskDialog() {
			this.textarea = ''
			this.editTaskMode = false
			this.dialogVisible = true
		},
		openEditTaskDialog(index) {
			this.editTaskIndex = index
			this.editTaskMode = true
			this.textarea = this.tasks[index].title
			this.dialogVisible = true
		},
		async removeTask(index) {
			await supabase.from('tasks').delete().eq('id', this.tasks[index].id)
			this.tasks.splice(index, 1)
		},
		async markIsComplete(index, is_complete) {
			await supabase.from('tasks').update({ is_complete: !is_complete }).eq('id', this.tasks[index].id)
			this.tasks[index].is_complete = !is_complete
		},
	},
	created() {
		this.fetchTasks();
	}, computed: {
		...mapState(Task, ['tasks']),
		...mapState(User, ['currentUser']),
		textareaValid() {
			return this.textarea.length > 5 && this.textarea.length < 30 && (!this.editTaskMode || this.tasks[this.editTaskIndex].title !== this.textarea)
		}
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