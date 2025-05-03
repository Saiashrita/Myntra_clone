import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demo purposes
const mockUsers = [
  { id: 1, name: 'Test User', email: 'test@example.com', password: 'password123' }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        const foundUser = mockUsers.find(u => 
          u.email === email && u.password === password
        );
        
        if (foundUser) {
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword as User);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        const userExists = mockUsers.some(u => u.email === email);
        
        if (!userExists) {
          const newUser = {
            id: mockUsers.length + 1,
            name,
            email,
            password
          };
          
          mockUsers.push(newUser);
          
          const { password: _, ...userWithoutPassword } = newUser;
          setUser(userWithoutPassword as User);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        login, 
        signup, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};