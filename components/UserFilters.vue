<template>
  <div class="filters">
    <input
      :value="search"
      placeholder="Search by name or email"
      @input="$emit('update:search', ($event.target as HTMLInputElement).value)"
    />

    <BaseSelect :model-value="role" :options="ROLES" @update:model-value="$emit('update:role', $event)" />

    <BaseSelect
      :model-value="perPage"
      :options="[10, 15, 20]"
      @update:model-value="$emit('update:perPage', Number($event))"
    />
  </div>
</template>

<script setup lang="ts">
import { ROLES, type TRole } from '~/types/user';

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

<style scoped>
.filters {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}
</style>
