<template>
  <UserFilters
    :search="searchInput"
    :role="role"
    :perPage="perPage"
    @update:search="searchInput = $event"
    @update:role="role = $event"
    @update:perPage="perPage = $event"
  />

  <UserTable :users="paginatedUsers" :sort-by="sortBy" :sort-direction="sortDirection" @sort="onSort" />

  <div class="pagination">
    <button :disabled="page === 1" @click="page--">Prev</button>

    <span>{{ page }} / {{ totalPages }}</span>

    <button :disabled="page === totalPages" @click="page++">Next</button>
  </div>
</template>

<script setup lang="ts">
import { users } from '~/data/users';
import { useUsersTable, type TSortField } from '~/composables/useUsersTable';

const { searchInput, role, sortBy, sortDirection, onSort, page, perPage, paginatedUsers, totalPages } =
  useUsersTable(users);
</script>

<style scoped>
.pagination {
  margin-top: 12px;
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>
