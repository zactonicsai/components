export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  roles: string[];
  groups: string[];
  permissions: {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
  };
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
  loading: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}