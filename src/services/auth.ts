import axios from 'axios';

// Define interfaces for auth types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'editor';
  avatar?: string;
  status?: 'active' | 'banned' | 'pending';
  createdAt?: string;
  lastLogin?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  username: string;
}

// For development purposes, we'll use localStorage to store mock authentication
const STORAGE_KEY = 'cricket_express_auth';

// Mock admin user for development
const MOCK_ADMIN: User = {
  id: '1',
  name: 'Admin User',
  email: 'admin@cricketexpress.com',
  role: 'admin',
  avatar: '/avatars/admin.png',
  status: 'active',
  createdAt: new Date().toISOString(),
  lastLogin: new Date().toISOString()
};

// Mock users for development
const MOCK_USERS: User[] = [
  MOCK_ADMIN,
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    status: 'active',
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'editor',
    status: 'active',
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  }
];

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
    // For development, check for admin credentials
    if (credentials.username === 'admin' && credentials.password === 'Admin@123') {
      const admin = {...MOCK_ADMIN, lastLogin: new Date().toISOString()};
      saveUserToStorage(admin);
      return admin;
    }
    
    // For other users (can be expanded later)
    const user = MOCK_USERS.find(u => 
      u.email.split('@')[0] === credentials.username || 
      u.name.toLowerCase() === credentials.username.toLowerCase()
    );
    
    if (user) {
      const updatedUser = {...user, lastLogin: new Date().toISOString()};
      saveUserToStorage(updatedUser);
      return updatedUser;
    }
    
    throw new Error('Invalid username or password');
  },
  
  register: async (data: RegisterData): Promise<User> => {
    // Check if username or email already exists
    const existingUser = MOCK_USERS.find(
      u => u.email === data.email || u.name.toLowerCase() === data.username.toLowerCase()
    );
    
    if (existingUser) {
      throw new Error('Username or email already exists');
    }
    
    // Create new user
    const newUser: User = {
      id: (MOCK_USERS.length + 1).toString(),
      name: data.name,
      email: data.email,
      role: 'user',
      status: 'active',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };
    
    // In a real app, we would save this to a database
    // For now, just save to localStorage
    saveUserToStorage(newUser);
    return newUser;
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
  },
  
  getAllUsers: (): User[] => {
    // In a real app, this would fetch from an API
    return MOCK_USERS;
  },
  
  updateUserStatus: (userId: string, status: 'active' | 'banned' | 'pending'): User | null => {
    // In a real app, this would update the database
    const user = getUserFromStorage();
    if (user && user.id === userId) {
      const updatedUser = {...user, status};
      saveUserToStorage(updatedUser);
      return updatedUser;
    }
    return null;
  }
};
