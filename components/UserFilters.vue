<template>
  <div class="filters">
    <input
      :value="search"
      @input="$emit('update:search', $event.target.value)"
      placeholder="Search by name or email"
    />

    <BaseSelect
      :model-value="role"
      @update:model-value="$emit('update:role', $event)"
      :options="['admin', 'manager', 'user']"
    />

    <BaseSelect
      :model-value="perPage"
      @update:model-value="$emit('update:perPage', Number($event))"
      :options="[10, 15, 20]"
    />
  </div>
</template>

<script setup>
defineProps({
  search: String,
  role: String,
  perPage: Number,
})

defineEmits([
  'update:search',
  'update:role',
  'update:perPage',
])
</script>

<style scoped>
.filters {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}
</style>
