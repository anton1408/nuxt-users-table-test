<template>
  <UserFilters
    :search="search"
    :role="role"
    :perPage="perPage"
    @update:search="search = $event"
    @update:role="role = $event"
    @update:perPage="perPage = $event"
  />

  <UserTable
    :users="paginatedUsers"
    @sort="onSort"
  />

  <div class="pagination">
    <button
      @click="page--"
      :disabled="page === 1"
    >
      Prev
    </button>

    <span>{{ page }} / {{ totalPages }}</span>

    <button
      @click="page++"
      :disabled="page === totalPages"
    >
      Next
    </button>
  </div>
</template>

<script setup>
import { users } from '~/data/users'
import { useUsersTable } from '~/composables/useUsersTable'

const {
  search,
  role,
  sortBy,
  sortDirection,
  page,
  perPage,
  paginatedUsers,
  totalPages,
} = useUsersTable(users)

function onSort(field) {
  if (sortBy.value === field) {
    sortDirection.value =
      sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = field
    sortDirection.value = 'asc'
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
