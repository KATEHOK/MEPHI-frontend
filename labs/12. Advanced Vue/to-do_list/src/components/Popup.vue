<!-- Шаблон и логика высплывающего окна -->

<script setup>
    
    const emit = defineEmits(['res'])
    const yes = () => {
        emit('res', true)
    }
    const no = () => {
        emit('res', false)
    }

</script>

<template>
    <Teleport to="body">
        <section style="position: absolute; top: 0px; left: 0px; background-color: white;">
            <slot/>
            <button @click="no">No</button>
            <button @click="yes">Yes</button>
        </section>
    </Teleport>
</template>