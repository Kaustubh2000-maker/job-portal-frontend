import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
// import { AuthContext, User } from "./AuthContext";
import type { User } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);

  const setUser = (user: User) => {
    setUserState(user);

    // persist for refresh (TEMP SOLUTION)
    localStorage.setItem("auth_user", JSON.stringify(user));
  };

  const logout = () => {
    setUserState(null);
    localStorage.removeItem("auth_user");
  };

  // restore user on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user");
    if (storedUser) {
      setUserState(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
