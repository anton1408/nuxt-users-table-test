<template>
  <select
    v-model="model"
    class="select"
  >
    <option :value="null">All</option>
    <option
      v-for="option in options"
      :key="option"
      :value="option"
    >
      {{ option }}
    </option>
  </select>
</template>

<script setup>
defineProps({
  options: {
    type: Array,
    required: true,
  },
})

const model = defineModel()
</script>

<style scoped>
.select {
  padding: 6px;
}
</style>
