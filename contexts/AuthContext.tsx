import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '../types';

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password?: string;
}

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  register: (data: RegisterData) => void;
  logout: () => void;
  isAuthenticated: boolean;
  // Admin features
  allUsers: User[]; 
  toggleUserStatus: (id: string) => void;
  deleteUser: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock initial database
const INITIAL_USERS: User[] = [
  {
    id: '1',
    name: 'Rich Choi Administrator',
    email: 'admin@richchoi.com',
    role: UserRole.ADMIN,
    avatar: 'https://ui-avatars.com/api/?name=Admin&background=C5A028&color=fff',
    isActive: true,
    phone: '0999999999',
    joinedDate: '2023-01-01'
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'guest@example.com',
    role: UserRole.GUEST,
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=0F172A&color=fff',
    isActive: true,
    phone: '0123456789',
    joinedDate: '2024-05-15'
  },
  {
    id: '3',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: UserRole.GUEST,
    avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=0F172A&color=fff',
    isActive: false, // Simulated blocked user
    phone: '0987654321',
    joinedDate: '2024-06-20'
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>(INITIAL_USERS);

  const login = (role: UserRole) => {
    // Simulated login based on role
    // In a real app, we would validate email/password against allUsers
    const foundUser = allUsers.find(u => u.role === role && u.isActive);
    
    if (foundUser) {
        setUser(foundUser);
    } else {
        // Fallback for demo if no specific user matches simple role login
        const newUser = {
            id: Date.now().toString(),
            name: role === UserRole.ADMIN ? 'Rich Choi Administrator' : 'Valued Guest',
            email: role === UserRole.ADMIN ? 'admin@richchoi.com' : 'guest@example.com',
            role: role,
            avatar: 'https://picsum.photos/200',
            isActive: true,
            joinedDate: new Date().toISOString().split('T')[0]
        };
        setUser(newUser);
    }
  };

  const register = (data: RegisterData) => {
    const newUser: User = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      role: UserRole.GUEST,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=0F172A&color=fff`,
      phone: data.phone,
      isActive: true,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    
    setAllUsers([...allUsers, newUser]);
    setUser(newUser); // Auto login after register
  };

  const logout = () => {
    setUser(null);
  };

  // Admin Actions
  const toggleUserStatus = (id: string) => {
    setAllUsers(prev => prev.map(u => 
      u.id === id ? { ...u, isActive: !u.isActive } : u
    ));
  };

  const deleteUser = (id: string) => {
    setAllUsers(prev => prev.filter(u => u.id !== id));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      isAuthenticated: !!user,
      allUsers,
      toggleUserStatus,
      deleteUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};