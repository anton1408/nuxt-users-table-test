<template>
  <select v-model="model" class="select">
    <option v-if="nullable" :value="null">All</option>
    <option v-for="option in options" :key="option" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script setup lang="ts" generic="T extends string | number">
interface IProps {
  options: readonly T[];
  nullable?: boolean;
}

const { options, nullable } = defineProps<IProps>();

const model = defineModel<T | null>({ default: null });
</script>

<style scoped>
.select {
  padding: 6px;
}
</style>
