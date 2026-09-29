import { ROLES, type TUser, type TRole } from '~/types/user';

export const users: TUser[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  age: 18 + (i % 40),
  role: ROLES[i % ROLES.length] as TRole,
  createdAt: new Date(Date.now() - i * 1000 * 60 * 60 * 24).toISOString(),
}));
