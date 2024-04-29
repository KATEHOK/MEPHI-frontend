<script setup>
    import { ref } from 'vue'

    const count = ref(0)
    const props = defineProps(['amount'])
    const emit = defineEmits(['userClick'])

    const onClick = () => {
        count.value += props.amount
        emit('userClick', count.value)
    }
</script>

<template>
    <button @click="onClick">Clicked: {{ count }}</button>
</template>