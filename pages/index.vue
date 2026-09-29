<template>
  <UserFilters
    :search="search"
    :role="role"
    :perPage="perPage"
    @update:search="search = $event"
    @update:role="role = $event"
    @update:perPage="perPage = $event"
  />

  <UserTable :users="paginatedUsers" @sort="onSort" />

  <div class="pagination">
    <button :disabled="page === 1" @click="page--">Prev</button>

    <span>{{ page }} / {{ totalPages }}</span>

    <button :disabled="page === totalPages" @click="page++">Next</button>
  </div>
</template>

<script setup lang="ts">
import { users } from '~/data/users';
import { useUsersTable, type TSortField } from '~/composables/useUsersTable';

const { search, role, sortBy, sortDirection, page, perPage, paginatedUsers, totalPages } = useUsersTable(users);

function onSort(field: TSortField) {
  if (sortBy.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortBy.value = field;
    sortDirection.value = 'asc';
  }
}
</script>

<style scoped>
.pagination {
  margin-top: 12px;
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>
