<!-- Шаблон и логика выполнения задачи -->

<script setup>
    import { inject } from 'vue'

    const tasks = inject('tasks')
    const props = defineProps(['task'])

    const emit = defineEmits(['list', 'upload'])
    const listTasks = () => {
        emit('list')
    }
    const uploadTasks = () => {
        emit('upload')
    }

    const completeTask = () => {
        for (let key in tasks.value) {
            if (props.task === key) {
                tasks.value[key]['done'] = true
                break
            }
        }
        uploadTasks()
        listTasks()
    }

</script>

<template>
    <h3>Mark as done?</h3>

    <button @click="listTasks">No</button>
    <button @click="completeTask">Yes</button>
</template>