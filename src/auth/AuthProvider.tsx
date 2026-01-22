// import { useState, useEffect } from "react";
// import { AuthContext } from "./AuthContext";
// import type { User, JobSeeker } from "./AuthContext";

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUserState] = useState<User | null>(null);
//   const [jobSeeker, setJobSeekerState] = useState<JobSeeker | null>(null);

//   const setUser = (user: User) => {
//     setUserState(user);
//     localStorage.setItem("auth_user", JSON.stringify(user));
//   };

//   const setJobSeeker = (jobSeeker: JobSeeker) => {
//     setJobSeekerState(jobSeeker);
//     localStorage.setItem("job_seeker", JSON.stringify(jobSeeker));
//   };

//   const logout = () => {
//     setUserState(null);
//     setJobSeekerState(null);
//     localStorage.removeItem("auth_user");
//     localStorage.removeItem("job_seeker");
//   };

//   // restore on refresh
//   useEffect(() => {
//     const storedUser = localStorage.getItem("auth_user");
//     const storedJobSeeker = localStorage.getItem("job_seeker");

//     if (storedUser) {
//       setUserState(JSON.parse(storedUser));
//     }

//     if (storedJobSeeker) {
//       setJobSeekerState(JSON.parse(storedJobSeeker));
//     }
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         jobSeeker,
//         isAuthenticated: !!user,
//         setUser,
//         setJobSeeker,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import type { User, JobSeeker } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [jobSeeker, setJobSeekerState] = useState<JobSeeker | null>(null);
  const [loading, setLoading] = useState(true);

  const setUser = (user: User) => {
    setUserState(user);
    localStorage.setItem("auth_user", JSON.stringify(user));
  };

  const setJobSeeker = (jobSeeker: JobSeeker) => {
    setJobSeekerState(jobSeeker);
    localStorage.setItem("job_seeker", JSON.stringify(jobSeeker));
  };

  const logout = () => {
    setUserState(null);
    setJobSeekerState(null);
    localStorage.removeItem("auth_user");
    localStorage.removeItem("job_seeker");
  };

  // restore auth + jobseeker on refresh (SAFE)
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("auth_user");
      const storedJobSeeker = localStorage.getItem("job_seeker");

      if (storedUser) {
        setUserState(JSON.parse(storedUser));
      }

      if (storedJobSeeker) {
        setJobSeekerState(JSON.parse(storedJobSeeker));
      }
    } catch (error) {
      console.error("Auth restore failed, clearing storage");
      logout();
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        jobSeeker,
        isAuthenticated: !!user,
        setUser,
        setJobSeeker,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
