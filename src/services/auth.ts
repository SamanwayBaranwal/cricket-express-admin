import axios from 'axios';

// Define interfaces for auth types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

// For development purposes, we'll use localStorage to store mock authentication
const STORAGE_KEY = 'cricket_express_auth';

// Mock admin user for development
const MOCK_ADMIN: User = {
  id: '1',
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'admin',
  avatar: '/avatars/admin.png'
};

// Helper functions
const saveUserToStorage = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const getUserFromStorage = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  return JSON.parse(userStr);
};

// Auth service functions
export const authService = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    // For development, auto-login as admin if email contains 'admin'
    if (credentials.email.includes('admin')) {
      saveUserToStorage(MOCK_ADMIN);
      return MOCK_ADMIN;
    }
    throw new Error('Invalid credentials');
  },
  
  register: async (data: RegisterData): Promise<User> => {
    // For development, register as admin if email contains 'admin'
    if (data.email.includes('admin')) {
      saveUserToStorage(MOCK_ADMIN);
      return MOCK_ADMIN;
    }
    throw new Error('Registration failed');
  },
  
  logout: () => {
    localStorage.removeItem('user');
  },
  
  getCurrentUser: (): User | null => {
    return getUserFromStorage();
  },
  
  isAuthenticated: (): boolean => {
    return !!getUserFromStorage();
  },
  
  isAdmin: (): boolean => {
    const user = getUserFromStorage();
    return user?.role === 'admin';
  }
};
