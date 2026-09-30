<template>
  <select v-model="model" class="rounded border border-gray-300 px-2 py-1.5 dark:border-gray-600 dark:bg-gray-800">
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
