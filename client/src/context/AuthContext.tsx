import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthUser {
  username: string;
  role?: string;
  loginTime: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'src_admin_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check existing stored session on mount
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.username) {
          setUser(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to parse admin session:', e);
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    // 1. First attempt server-side verification
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: trimmedUsername, password: trimmedPassword }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          const authData: AuthUser = {
            username: data.user?.username || trimmedUsername,
            role: data.user?.role || 'Administrator',
            loginTime: new Date().toISOString(),
          };
          setUser(authData);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(authData));
          return { success: true };
        }
      } else {
        const errData = await res.json().catch(() => null);
        if (errData && errData.message) {
          return { success: false, error: errData.message };
        }
      }
    } catch {
      console.warn('Backend server unreachable, checking client-side environment configuration...');
    }

    // 2. Client-side fallback check against environment configuration
    const expectedUsername = (import.meta.env.VITE_ADMIN_USERNAME || 'SRCAdmin').trim();
    const expectedPassword = (import.meta.env.VITE_ADMIN_PASSWORD || 'whothehellisthis').trim();

    if (trimmedUsername === expectedUsername && trimmedPassword === expectedPassword) {
      const authData: AuthUser = {
        username: expectedUsername,
        role: 'Administrator',
        loginTime: new Date().toISOString(),
      };
      setUser(authData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authData));
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid administrative username or password. Please verify your credentials.',
    };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
