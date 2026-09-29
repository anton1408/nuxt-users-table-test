import type { TRole, TUser } from '~/types/user';

export type TSortField = 'age' | 'createdAt';
export type TSortBy = TSortField | null;
export type TSortDirection = 'asc' | 'desc';

export function useUsersTable(users: TUser[]) {
  // filters
  const search = ref('');
  const role = ref<TRole | null>(null);
  const filteredUsers = computed(() => {
    const query = search.value.trim().toLowerCase();
    const selectedRole = role.value;

    return users.filter((user) => {
      if (selectedRole !== null && user.role !== selectedRole) return false;

      if (query === '') return true;

      return user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query);
    });
  });

  // sorting
  const sortBy = ref<TSortBy>(null);
  const sortDirection = ref<TSortDirection>('asc');
  const sortedUsers = computed(() => {
    if (!sortBy.value) return filteredUsers.value;

    return [...filteredUsers.value].sort((a, b) => {
      if (sortBy.value === 'age') {
        return sortDirection.value === 'asc' ? a.age - b.age : b.age - a.age;
      }

      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();

      return sortDirection.value === 'asc' ? dateA - dateB : dateB - dateA;
    });
  });

  function onSort(field: TSortField) {
    if (sortBy.value === field) {
      sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
    } else {
      sortBy.value = field;
      sortDirection.value = 'asc';
    }
  }

  // pagination
  const page = ref(1);
  const perPage = ref(10);

  // TODO:
  // - paginatedUsers
  // - totalPages
  const paginatedUsers = sortedUsers;
  const totalPages = null;

  return {
    search,
    role,

    sortBy,
    sortDirection,
    onSort,

    page,
    perPage,

    paginatedUsers,
    totalPages,
  };
}
