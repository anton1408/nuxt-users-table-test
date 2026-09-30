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

  <div class="mt-3 flex items-center gap-2">
    <button
      :disabled="page === 1"
      class="rounded border border-gray-300 px-3 py-1 hover:bg-gray-100 disabled:opacity-40 dark:border-gray-600 dark:hover:bg-gray-800"
      @click="page--"
    >
      Prev
    </button>

    <span>{{ page }} / {{ totalPages }}</span>

    <button
      :disabled="page === totalPages"
      class="rounded border border-gray-300 px-3 py-1 hover:bg-gray-100 disabled:opacity-40 dark:border-gray-600 dark:hover:bg-gray-800"
      @click="page++"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
import { users } from '~/data/users';
import { useUsersTable, type TSortField } from '~/composables/useUsersTable';

const { searchInput, role, sortBy, sortDirection, onSort, page, perPage, paginatedUsers, totalPages } =
  useUsersTable(users);
</script>
