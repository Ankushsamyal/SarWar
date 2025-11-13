import React, { createContext, useContext, useEffect, useState } from "react";

type User = { username: string } | null;

type AuthContextType = {
  user: User;
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "_mock_token";
const USER_KEY = "_mock_user";

function createMockToken(username: string, expiresInSeconds = 300) {
  const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
  return btoa(JSON.stringify({ sub: username, exp }));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(() => {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  });
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_KEY)
  );

  useEffect(() => {
    let timer: number | undefined;

    function scheduleRefresh(rawToken: string | null) {
      if (!rawToken) return;
      try {
        const decoded = JSON.parse(atob(rawToken));
        const now = Math.floor(Date.now() / 1000);
        const ttl = decoded.exp - now;
        const refreshIn = Math.max(
          (ttl - 30) * 1000,
          Math.floor(ttl / 2) * 1000
        );
        if (refreshIn <= 0) {
          logout();
          return;
        }
        timer = window.setTimeout(() => {
          const username = decoded.sub || "user";
          const newToken = createMockToken(username, 300);
          localStorage.setItem(TOKEN_KEY, newToken);
          setToken(newToken);
          scheduleRefresh(newToken);
        }, refreshIn);
      } catch (e) {
        logout();
      }
    }

    scheduleRefresh(token);

    return () => {
      if (timer) window.clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function login(username: string, password: string) {
    if (username === "admin" && password === "password") {
      const newToken = createMockToken(username, 300);
      const userObj = { username };
      localStorage.setItem(TOKEN_KEY, newToken);
      localStorage.setItem(USER_KEY, JSON.stringify(userObj));
      setToken(newToken);
      setUser(userObj);
      return true;
    }
    return false;
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export default AuthProvider;
