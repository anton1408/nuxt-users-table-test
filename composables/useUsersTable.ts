import type { TRole, TUser } from '~/types/user';
import { ROLES, PER_PAGE_OPTIONS } from '~/types/user';

export type TSortField = 'age' | 'createdAt';
export type TSortBy = TSortField | null;
export type TSortDirection = 'asc' | 'desc';

const DEFAULT_PER_PAGE = 10;
const SEARCH_DEBOUNCE_MS = 400;

function singleQueryValue(v: unknown): string | undefined {
  if (Array.isArray(v)) v = v[0];

  return typeof v === 'string' ? v : undefined;
}
function parseRole(v: unknown): TRole | null {
  const value = singleQueryValue(v);

  return value && (ROLES as readonly string[]).includes(value) ? (value as TRole) : null;
}
function parseSortBy(v: unknown): TSortBy {
  const value = singleQueryValue(v);

  return value === 'age' || value === 'createdAt' ? value : null;
}
function parseSortDirection(v: unknown): TSortDirection {
  return singleQueryValue(v) === 'desc' ? 'desc' : 'asc';
}
function parsePerPage(v: unknown): number {
  const parsed = Number(singleQueryValue(v));

  return (PER_PAGE_OPTIONS as readonly number[]).includes(parsed) ? parsed : DEFAULT_PER_PAGE;
}
function parsePage(v: unknown): number {
  const parsed = Number(singleQueryValue(v));

  return Number.isInteger(parsed) && parsed >= 1 ? parsed : 1;
}

export function useUsersTable(users: TUser[]) {
  const route = useRoute();
  const router = useRouter();

  // filters
  const initialSearch = singleQueryValue(route.query.search)?.trim() ?? '';

  const searchInput = ref(initialSearch); // updates on every keystroke
  const search = useDebouncedRef(searchInput, SEARCH_DEBOUNCE_MS); // debounced
  const role = ref<TRole | null>(parseRole(route.query.role));

  const filteredUsers = computed(() => {
    const searchTerm = search.value.trim().toLowerCase();
    const selectedRole = role.value;

    return users.filter((user) => {
      if (selectedRole !== null && user.role !== selectedRole) return false;

      if (searchTerm === '') return true;

      return user.name.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm);
    });
  });

  // sorting
  const sortBy = ref<TSortBy>(parseSortBy(route.query.sortBy));
  const sortDirection = ref<TSortDirection>(parseSortDirection(route.query.sortDirection));

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
  const perPage = ref(parsePerPage(route.query.perPage));
  const page = ref(parsePage(route.query.page));

  const paginatedUsers = computed(() =>
    sortedUsers.value.slice((page.value - 1) * perPage.value, page.value * perPage.value),
  );
  const totalPages = computed(() => Math.max(1, Math.ceil(sortedUsers.value.length / perPage.value)));

  watch([search, role, perPage], () => {
    page.value = 1;
  });
  watch(
    totalPages,
    (max) => {
      if (page.value > max) page.value = max;
    },
    { immediate: true },
  );

  // query params sync
  function buildQueryFromState(): Record<string, string> {
    const nextQuery: Record<string, string> = {};
    const trimmedSearch = search.value.trim();

    if (trimmedSearch) nextQuery.search = trimmedSearch;
    if (role.value) nextQuery.role = role.value;
    if (sortBy.value) {
      nextQuery.sortBy = sortBy.value;
      nextQuery.sortDirection = sortDirection.value;
    }
    if (page.value > 1) nextQuery.page = String(page.value);
    if (perPage.value !== DEFAULT_PER_PAGE) nextQuery.perPage = String(perPage.value);
    return nextQuery;
  }

  watch([search, role, sortBy, sortDirection, page, perPage], () => {
    router.replace({ query: buildQueryFromState() });
  });

  // Normalize a "dirty"/invalid URL once on the client
  onMounted(() => {
    router.replace({ query: buildQueryFromState() });
  });

  return {
    searchInput,
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
