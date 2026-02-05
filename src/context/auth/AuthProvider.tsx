import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import type { User, JobSeeker, Company, CompanyUser } from "./AuthContext";
import { connectSocket, disconnectSocket } from "../../socket";
import { getSocket } from "../../socket";
import { toast } from "react-toastify";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [jobSeeker, setJobSeekerState] = useState<JobSeeker | null>(null);
  const [company, setCompanyState] = useState<Company | null>(null);
  const [companyUser, setCompanyUserState] = useState<CompanyUser | null>(null);
  const [loading, setLoading] = useState(true);

  const setUser = (user: User) => {
    setUserState(user);
    localStorage.setItem("auth_user", JSON.stringify(user));
  };

  const setJobSeeker = (jobSeeker: JobSeeker) => {
    setJobSeekerState(jobSeeker);
    localStorage.setItem("job_seeker", JSON.stringify(jobSeeker));
  };

  const setCompany = (company: Company | null) => {
    setCompanyState(company);
    if (company) {
      localStorage.setItem("company", JSON.stringify(company));
    } else {
      localStorage.removeItem("company");
    }
  };

  const setCompanyUser = (companyUser: CompanyUser | null) => {
    setCompanyUserState(companyUser);
    if (companyUser) {
      localStorage.setItem("company_user", JSON.stringify(companyUser));
    } else {
      localStorage.removeItem("company_user");
    }
  };

  const logout = () => {
    disconnectSocket();

    setUserState(null);
    setJobSeekerState(null);
    setCompanyState(null);
    setCompanyUserState(null);

    localStorage.removeItem("auth_user");
    localStorage.removeItem("job_seeker");
    localStorage.removeItem("company");
    localStorage.removeItem("company_user");
  };

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("auth_user");
      const storedJobSeeker = localStorage.getItem("job_seeker");
      const storedCompany = localStorage.getItem("company");
      const storedCompanyUser = localStorage.getItem("company_user");

      if (storedUser) setUserState(JSON.parse(storedUser));
      if (storedJobSeeker) setJobSeekerState(JSON.parse(storedJobSeeker));
      if (storedCompany) setCompanyState(JSON.parse(storedCompany));
      if (storedCompanyUser) setCompanyUserState(JSON.parse(storedCompanyUser));
    } catch (err) {
      console.error("Auth restore failed");
      logout();
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      connectSocket();
    } else {
      disconnectSocket();
    }

    return () => {
      disconnectSocket();
    };
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const socket = getSocket();
    if (!socket) return;

    const onNotification = (data: any) => {
      console.log("🔔 Notification received:", data);
      toast.info(data.message);
    };

    socket.on("notification", onNotification);

    return () => {
      socket.off("notification", onNotification);
    };
  }, [user]);

  console.log("🔥 AuthProvider rendered");
  useEffect(() => {
    console.log("👤 user state changed:", user);
  }, [user]);

  useEffect(() => {
    console.log("👤 user state changed:", user);
  }, [user]);

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider
      value={{
        user,
        jobSeeker,
        company,
        companyUser,
        isAuthenticated: !!user,
        setUser,
        setJobSeeker,
        setCompany,
        setCompanyUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
