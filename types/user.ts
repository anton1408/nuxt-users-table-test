export const ROLES = ['admin', 'manager', 'user'] as const;
export const PER_PAGE_OPTIONS = [10, 15, 20] as const;

export type TRole = (typeof ROLES)[number];

export interface TUser {
  id: number;
  name: string;
  email: string;
  age: number;
  role: TRole;
  createdAt: string; // ISO - 2026-09-28T10:00:00.000Z
}
