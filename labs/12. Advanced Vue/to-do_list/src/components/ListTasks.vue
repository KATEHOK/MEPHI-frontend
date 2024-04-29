<!-- Логика и шаблон списка задач -->

<script setup>
    import { inject } from 'vue'

    const tasks = inject('tasks')

    const emit = defineEmits(['create', 'del', 'done'])
    const createTask = () => {
        emit('create')
    }
    const deleteTask = (id) => {
        emit('del', id)
    }
    const completeTask = (id) => {
        emit('done', id)
    }


</script>


<template>

    <button @click="createTask">Create new task</button>

    <section>
        <h3>Your tasks</h3>

        <article v-for="value, key in tasks" style="border: 1px solid black;">
            <h4>{{ value['title'] }}</h4>
            <p>{{ value['body'] }}</p>
            <p v-if="value['done']">Done</p>
            <p v-else>Not done</p>
            <button @click="completeTask(key)">Complete</button>
            <button @click="deleteTask(key)">Delete</button>
        </article>
    </section>

</template>