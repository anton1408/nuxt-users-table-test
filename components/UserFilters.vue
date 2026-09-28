<template>
  <div class="filters">
    <input :value="search" placeholder="Search by name or email" @input="$emit('update:search', $event.target.value)" />

    <BaseSelect
      :model-value="role"
      :options="['admin', 'manager', 'user']"
      @update:model-value="$emit('update:role', $event)"
    />

    <BaseSelect
      :model-value="perPage"
      :options="[10, 15, 20]"
      @update:model-value="$emit('update:perPage', Number($event))"
    />
  </div>
</template>

<script setup>
defineProps({
  search: String,
  role: String,
  perPage: Number,
});

defineEmits(['update:search', 'update:role', 'update:perPage']);
</script>

<style scoped>
.filters {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}
</style>
