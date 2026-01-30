import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type AdminSection = "USERS" | "COMPANIES" | "JOBS" | "APPLICATIONS";

interface AdminContextType {
  activeSection: AdminSection;
  setActiveSection: (section: AdminSection) => void;
}

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState<AdminSection>("USERS");

  return (
    <AdminContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) {
    throw new Error("useAdmin must be used inside AdminProvider");
  }
  return ctx;
};
