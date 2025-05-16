
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type UserRole = "pensioner" | "admin" | null;

interface User {
  id: string;
  role: UserRole;
  aadhaarNumber?: string;
  email?: string;
  name?: string;
  lastVerification?: Date | null;
  verificationStatus?: "success" | "failed" | "pending" | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: { identifier: string; password: string; role: UserRole }) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // This is a placeholder. In reality, we would use Supabase auth here
  const login = async (credentials: { identifier: string; password: string; role: UserRole }) => {
    setLoading(true);
    try {
      // Mock login - will be replaced with actual Supabase auth
      // After Supabase integration, this will use supabase.auth.signIn()
      if (credentials.role === "pensioner") {
        setUser({
          id: "p123",
          role: "pensioner",
          aadhaarNumber: credentials.identifier,
          name: "John Doe",
          lastVerification: new Date(2023, 4, 15),
          verificationStatus: "success"
        });
        navigate("/pensioner/dashboard");
      } else if (credentials.role === "admin") {
        setUser({
          id: "a456",
          role: "admin",
          email: credentials.identifier,
          name: "Admin User"
        });
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Will be replaced with supabase.auth.signOut()
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Check if user is already logged in
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Will be replaced with supabase.auth.user()
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error checking auth status", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
