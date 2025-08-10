import type { User } from "../types/types";

export const USERS_DATA: User[] = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    email: 'admin@example.com',
    roles: ['admin'],
    groups: ['administrators'],
    permissions: {
      create: true,
      read: true,
      update: true,
      delete: true
    }
  },
  {
    id: 2,
    username: 'user',
    password: 'user123',
    email: 'user@example.com',
    roles: ['user'],
    groups: ['users'],
    permissions: {
      create: false,
      read: true,
      update: false,
      delete: false
    }
  },
  {
    id: 3,
    username: 'editor',
    password: 'editor123',
    email: 'editor@example.com',
    roles: ['editor'],
    groups: ['editors'],
    permissions: {
      create: true,
      read: true,
      update: true,
      delete: false
    }
  },
  {
    id: 4,
    username: 'manager',
    password: 'manager123',
    email: 'manager@example.com',
    roles: ['manager', 'editor'],
    groups: ['management', 'editors'],
    permissions: {
      create: true,
      read: true,
      update: true,
      delete: true
    }
  }
];