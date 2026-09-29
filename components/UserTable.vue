<template>
  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>

          <th @click="$emit('sort', 'age')">Age</th>

          <th>Role</th>

          <th @click="$emit('sort', 'createdAt')">Created</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="user in users" :key="user.id">
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
import type { TSortField } from '~/composables/useUsersTable';

interface IProps {
  users: TUser[];
}

const { users } = defineProps<IProps>();

defineEmits<{ sort: [field: TSortField] }>();
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
  cursor: pointer;
}
</style>
