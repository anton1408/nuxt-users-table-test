export const users = Array.from({ length: 50 }, (_, i) => {
  const roles = ['admin', 'manager', 'user']

  return {
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    age: 18 + (i % 40),
    role: roles[i % roles.length],
    createdAt: new Date(
      Date.now() - i * 1000 * 60 * 60 * 24
    ).toISOString(),
  }
})
