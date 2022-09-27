<template>
	<el-dialog v-model="dialogVisibleValue" :title="editTaskMode ? 'Edit task' : 'Add task'" width="350px"
		:before-close="closeDialog">
		<el-input v-model="textareaValue" maxlength="30" minlength="5" placeholder="Please input" :validate-event="true"
			type="textarea" show-word-limit />
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="closeDialog()">Cancel</el-button>
				<el-button type="primary" @click="saveClick()" :disabled="!textareaValid">Confirm</el-button>
			</span>
		</template>
	</el-dialog>
</template>
<script>
import { mapActions, mapState } from 'pinia'
import Task from '@/store/task'
import User from '@/store/user'


export default {
	data() {
		return {
			textareaValue: '',
			dialogVisibleValue: false,
		}
	},
	
	computed: {
		...mapState(Task, ['dialogVisible']),
		...mapState(Task, ['editTaskIndex']),
		...mapState(Task, ['editTaskMode']),
		...mapState(Task, ['textarea']),
		...mapState(User, ['currentUser']),
		...mapState(Task, ['currentTask']),
		textareaValid() {
			return this.textareaValue.length > 5 && this.textareaValue.length < 30 && (!this.editTaskMode || this.currentTask.title !== this.textareaValue)
		}

	},
	methods:{
		...mapActions(Task, ['closeDialog']),
		...mapActions(Task, ['update']),
		...mapActions(Task, ['add']),
		saveClick() {
			if (this.editTaskMode) {
				this.editTask()
			} else {
				this.addTask()
			}
			this.closeDialog()
		},
		async addTask() {
			const task = {
				title: this.textareaValue,
				is_complete: false,
				user_id: this.currentUser.id
			}
			this.add(task)
		},
		async editTask() {
			if (this.editTaskIndex === -1 || !this.currentTask || this.editTaskMode === false) {
				return
			}
			const task = this.currentTask
			task.title = this.textareaValue
			this.update(task, this.editTaskIndex)
		},
		
	},
	watch: {
		textarea: {
			handler: function (val) {
				this.textareaValue = val
			},
			deep: true,
		},
		dialogVisible: {
			handler: function (val) {
				this.dialogVisibleValue = val
			},
			deep: true,
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