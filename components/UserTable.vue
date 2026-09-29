<template>
  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>

          <th class="sortable" :aria-sort="ariaSort('age')" @click="$emit('sort', 'age')">
            Age <span class="sort-indicator">{{ sortIndicator('age') }}</span>
          </th>

          <th>Role</th>

          <th class="sortable" :aria-sort="ariaSort('createdAt')" @click="$emit('sort', 'createdAt')">
            Created <span class="sort-indicator">{{ sortIndicator('createdAt') }}</span>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="users.length === 0">
          <td class="empty" :colspan="5">No users found</td>
        </tr>

        <tr v-for="user in users" v-else :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.age }}</td>
          <td>{{ user.role }}</td>
          <td>
            {{ new Date(user.createdAt).toLocaleDateString() }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { TUser } from '~/types/user';
import type { TSortField, TSortBy, TSortDirection } from '~/composables/useUsersTable';

interface IProps {
  users: TUser[];
  sortBy: TSortBy;
  sortDirection: TSortDirection;
}

const { users, sortBy, sortDirection } = defineProps<IProps>();

defineEmits<{ sort: [field: TSortField] }>();

function sortIndicator(field: TSortField): string {
  if (sortBy !== field) return '';

  return sortDirection === 'asc' ? '▲' : '▼';
}

function ariaSort(field: TSortField): 'ascending' | 'descending' | 'none' {
  if (sortBy !== field) return 'none';

  return sortDirection === 'asc' ? 'ascending' : 'descending';
}
</script>

<style scoped>
.table-wrapper {
  max-height: 400px;
  overflow: auto;
}

thead th {
  position: sticky;
  top: 0;
  background: #fff;
}

th.sortable {
  cursor: pointer;
}

.sort-indicator {
  display: inline-block;
  width: 1em;
}

.empty {
  text-align: center;
  padding: 24px;
  color: #888;
}
</style>
