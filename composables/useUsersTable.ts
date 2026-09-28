export function useUsersTable(users) {
  // filters
  const search = ref('')
  const role = ref(null)

  // sorting
  const sortBy = ref(null) // 'age' | 'createdAt'
  const sortDirection = ref('asc')

  // pagination
  const page = ref(1)
  const perPage = ref(10)

  // TODO:
  // - filteredUsers
  // - sortedUsers
  // - paginatedUsers
  // - totalPages
  const paginatedUsers = null
  const totalPages = null

  return {
    search,
    role,
    sortBy,
    sortDirection,
    page,
    perPage,

    paginatedUsers,
    totalPages,
  }
}
