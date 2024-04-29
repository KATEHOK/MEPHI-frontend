<!-- Логика и шаблон создания новой задачи -->

<script setup>
    import { inject, ref } from 'vue'

    const tasks = inject('tasks')
    const task = ref({
        title: '',
        body: '',
        done: false
    })

    const emit = defineEmits(['list', 'upload'])
    const listTasks = () => {
        emit('list')
    }
    const uploadTasks = () => {
        emit('upload')
    }

    const save = () => {
        tasks.value[(new Date()).getTime()] = task

        uploadTasks()
        listTasks()
    }

</script>

<template>
    <button @click="listTasks">Home</button>
    <button @click="save">Save</button>

    <br>
    <input type="text" v-model="task['title']">
    <input type="checkbox" v-model="task['done']">
    <br>
    <textarea  cols="30" rows="10" v-model="task['body']"></textarea>
</template>