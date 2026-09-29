import type { TRole, TUser } from '~/types/user';

export type TSortField = 'age' | 'createdAt';
export type TSortBy = TSortField | null;
export type TSortDirection = 'asc' | 'desc';

export function useUsersTable(users: TUser[]) {
  // filters
  const search = ref('');
  const role = ref<TRole | null>(null);

  // sorting
  const sortBy = ref<TSortBy>(null);
  const sortDirection = ref<TSortDirection>('asc');

  // pagination
  const page = ref(1);
  const perPage = ref(10);

  const filteredUsers = computed(() => {
    const query = search.value.trim().toLowerCase();
    const selectedRole = role.value;

    return users.filter((user) => {
      if (selectedRole !== null && user.role !== selectedRole) return false;

      if (query === '') return true;

      return user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query);
    });
  });

  // TODO:
  // - sortedUsers
  // - paginatedUsers
  // - totalPages
  const paginatedUsers = filteredUsers;
  const totalPages = null;

  return {
    search,
    role,
    sortBy,
    sortDirection,
    page,
    perPage,

    paginatedUsers,
    totalPages,
  };
}
