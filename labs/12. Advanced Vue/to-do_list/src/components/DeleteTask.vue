<!-- Шаблон и логика удаления задачи -->

<script setup>
    import { inject, ref } from 'vue'
    import Popup from './Popup.vue';

    const tasks = inject('tasks')
    const props = defineProps(['task'])
    const showModal = ref(false)

    const emit = defineEmits(['list', 'upload'])
    const listTasks = () => {
        emit('list')
    }
    const uploadTasks = () => {
        emit('upload')
    }

    const confirmed = (e) => { 


        showModal.value = false
        if (e) deleteTask()
    }

    const deleteTask = () => {
        for (let key in tasks.value) {
            if (props.task === key) {
                delete tasks.value[key]
                break
            }
        }
        uploadTasks()
        listTasks()
    }

</script>

<template>
    <!-- <h3>Are you sure?</h3> -->

    <button @click="listTasks">No</button>
    <button @click="showModal = true">Yes</button>

    <Popup v-if="showModal" @res="confirmed">
        <h3>Realy???</h3>
    </Popup>
</template>