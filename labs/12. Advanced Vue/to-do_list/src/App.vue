<script setup>
  import { onMounted, ref, provide } from 'vue'

  import ListTasks from './components/ListTasks.vue'
  import CreateTask from './components/CreateTask.vue'
  import DeleteTask from './components/DeleteTask.vue'
  import CompleteTask from './components/CompleteTask.vue'

  const showListTasks = ref(true)
  const showCreateTask = ref(false)
  const showDeleteTask = ref(false)
  const showCompleteTask = ref(false)

  const tasks = ref({})
  provide('tasks', tasks)

  const taskId = ref('')

  const listTasks = () => {
    showDeleteTask.value = false
    showCreateTask.value = false
    showCompleteTask.value = false
    showListTasks.value = true
  }

  const createTask = () => {
    showListTasks.value = false
    showDeleteTask.value = false
    showCompleteTask.value = false
    showCreateTask.value = true
  }

  const deleteTask = (id) => {
    taskId.value = id

    showListTasks.value = false
    showCreateTask.value = false
    showCompleteTask.value = false
    showDeleteTask.value = true
  }

  const completeTask = (id) => {
    taskId.value = id

    showListTasks.value = false
    showCreateTask.value = false
    showDeleteTask.value = false
    showCompleteTask.value = true
  }

  const uploadTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
    downloadTasks()
  }

  const downloadTasks = () => {
    tasks.value = JSON.parse(localStorage.getItem('tasks'))
    if (tasks.value === null || tasks.value.length == 0) tasks.value = {}
  }

  onMounted(() => {
    console.log('App mounted')
    downloadTasks()
  })

</script>

<template>

  <ListTasks @done="completeTask" @del="deleteTask" @create="createTask" v-if="showListTasks"/>
  <CreateTask @upload="uploadTasks" @list="listTasks" v-else-if="showCreateTask"/>
  <DeleteTask @upload="uploadTasks" @list="listTasks" v-else-if="showDeleteTask" :task="taskId"/>
  <CompleteTask @upload="uploadTasks" @list="listTasks" v-else-if="showCompleteTask" :task="taskId"/>

</template>