<template>
  <div class="mb-3 flex gap-2">
    <input
      :value="search"
      placeholder="Search by name or email"
      class="rounded border border-gray-300 px-2 py-1.5 dark:border-gray-600 dark:bg-gray-800"
      @input="$emit('update:search', ($event.target as HTMLInputElement).value)"
    />

    <BaseSelect :model-value="role" :options="ROLES" nullable @update:model-value="$emit('update:role', $event)" />

    <BaseSelect
      :model-value="perPage"
      :options="PER_PAGE_OPTIONS"
      @update:model-value="$emit('update:perPage', Number($event))"
    />
  </div>
</template>

<script setup lang="ts">
import { ROLES, PER_PAGE_OPTIONS, type TRole } from '~/types/user';

interface IProps {
  search: string;
  role: TRole | null;
  perPage: number;
}

const { search, role, perPage } = defineProps<IProps>();

defineEmits<{
  'update:search': [value: string];
  'update:role': [value: TRole | null];
  'update:perPage': [value: number];
}>();
</script>
