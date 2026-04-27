import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import adminApi from "../lib/adminApi";

interface AdminUser {
  id: string;
  email: string;
}

interface AuthContextType {
  user: AdminUser | null;
  token: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem("admin_token");
    const u = localStorage.getItem("admin_user");
    if (t) setToken(t);
    if (u) setUser(JSON.parse(u));
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const res = await adminApi.login(email, password);
      if (res?.token) {
        localStorage.setItem("admin_token", res.token);
        localStorage.setItem("admin_user", JSON.stringify(res.user));
        setToken(res.token);
        setUser(res.user);
        return {};
      }
      return { error: "Invalid response" };
    } catch (err: any) {
      return { error: err.message || "Login failed" };
    }
  };

  const signOut = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
