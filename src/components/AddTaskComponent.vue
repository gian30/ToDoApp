<template>
	<el-button class="circle-button-add" type="primary" :icon="Plus" circle size="large" @click="openAddTaskDialog()" />
</template>
<script setup>
import {
	Plus
} from '@element-plus/icons-vue'
</script>
<script>
import { mapActions } from 'pinia'
import Task from '@/store/task'

export default {
	methods: {
		...mapActions(Task, ['openAddTaskDialog']),
	}
}
</script>
<style>
.circle-button-add {
	position: relative;
	bottom: 10px;
	z-index: 99;
}
</style>