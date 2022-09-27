<template>

	<div>
		<el-table :data="tableData" height="calc(100vh - 100px)">
			<el-table-column prop="task" label="" width="280px" />
			<el-table-column align="right">
				<template #default="scope">
					<el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)">
						Remove
					</el-button>
				</template>
			</el-table-column>

		</el-table>
		<el-button class="circle-button-add" type="primary" :icon="Plus" circle size="large"
			@click="dialogVisible = true" />
		<el-dialog v-model="dialogVisible" title="Tips" width="30%" :before-close="handleClose">
			<el-input v-model="textarea" maxlength="30" placeholder="Please input" type="textarea" />
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogVisible = false">Cancel</el-button>
					<el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
<script setup>
import {
	Plus
} from '@element-plus/icons-vue'
</script>
<script>
import { ref } from '@vue/reactivity'

export default {

	data() {
		return {
			dialogVisible: false,
			tableData: ref(Array.from({ length: 40 }).fill({
				task: 'Test task',
			}))
			,
			textarea: ''
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