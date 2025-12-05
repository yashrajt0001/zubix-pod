import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User, UserProfile, Pod, SocialLinks } from '@/types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  selectedRole: 'user' | 'pod_owner' | null;
  pendingPodOwner: Partial<Pod> | null;
  joinedPods: Pod[];
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  setSelectedRole: (role: 'user' | 'pod_owner') => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  setPendingPodOwner: (data: Partial<Pod>) => void;
  joinPod: (pod: Pod) => void;
  leavePod: (podId: string) => void;
}

interface SignupData {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const generateUsername = (name: string): string => {
  const cleanName = name.toLowerCase().replace(/\s+/g, '');
  const randomNum = Math.floor(Math.random() * 10000);
  return `${cleanName}${randomNum}`;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'user' | 'pod_owner' | null>(null);
  const [pendingPodOwner, setPendingPodOwner] = useState<Partial<Pod> | null>(null);
  const [joinedPods, setJoinedPods] = useState<Pod[]>([]);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Mock user data
    const mockUser: UserProfile = {
      id: '1',
      fullName: 'John Doe',
      email: email,
      mobile: '+91 9876543210',
      username: 'johndoe123',
      role: 'user',
      createdAt: new Date(),
      socialLinks: {},
    };
    
    setUser(mockUser);
    setIsLoading(false);
  }, []);

  const signup = useCallback(async (data: SignupData) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const mockUser: UserProfile = {
      id: crypto.randomUUID(),
      fullName: data.fullName,
      email: data.email,
      mobile: data.mobile,
      username: generateUsername(data.fullName),
      role: 'user',
      createdAt: new Date(),
      socialLinks: {},
    };
    
    setUser(mockUser);
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setSelectedRole(null);
    setPendingPodOwner(null);
    setJoinedPods([]);
  }, []);

  const updateUserProfile = useCallback((profile: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...profile } : null));
  }, []);

  const joinPod = useCallback((pod: Pod) => {
    setJoinedPods((prev) => {
      if (prev.find((p) => p.id === pod.id)) return prev;
      return [...prev, pod];
    });
  }, []);

  const leavePod = useCallback((podId: string) => {
    setJoinedPods((prev) => prev.filter((p) => p.id !== podId));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        selectedRole,
        pendingPodOwner,
        joinedPods,
        login,
        signup,
        logout,
        setSelectedRole,
        updateUserProfile,
        setPendingPodOwner,
        joinPod,
        leavePod,
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
