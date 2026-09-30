<template>
  <div class="max-h-[400px] overflow-auto rounded border border-gray-200 dark:border-gray-700">
    <table class="w-full border-collapse text-left text-sm">
      <thead>
        <tr>
          <th class="sticky top-0 z-10 bg-white px-3 py-2 dark:bg-gray-900">Name</th>
          <th class="sticky top-0 z-10 bg-white px-3 py-2 dark:bg-gray-900">Email</th>

          <th
            class="sticky top-0 z-10 cursor-pointer bg-white px-3 py-2 select-none hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800"
            :aria-sort="ariaSort('age')"
            @click="$emit('sort', 'age')"
          >
            Age <span class="inline-block w-3">{{ sortIndicator('age') }}</span>
          </th>

          <th class="sticky top-0 z-10 bg-white px-3 py-2 dark:bg-gray-900">Role</th>

          <th
            class="sticky top-0 z-10 cursor-pointer bg-white px-3 py-2 select-none hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800"
            :aria-sort="ariaSort('createdAt')"
            @click="$emit('sort', 'createdAt')"
          >
            Created <span class="inline-block w-3">{{ sortIndicator('createdAt') }}</span>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="users.length === 0">
          <td class="px-3 py-6 text-center text-gray-500 dark:text-gray-400" :colspan="5">No users found</td>
        </tr>

        <tr v-for="user in users" v-else :key="user.id" class="border-t border-gray-100 dark:border-gray-800">
          <td class="px-3 py-2">{{ user.name }}</td>
          <td class="px-3 py-2">{{ user.email }}</td>
          <td class="px-3 py-2">{{ user.age }}</td>
          <td class="px-3 py-2">{{ user.role }}</td>
          <td class="px-3 py-2">{{ new Date(user.createdAt).toLocaleDateString() }}</td>
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
