// import { createContext } from "react";

// /* =======================
//    Roles
// ======================= */
// export type Role = "JOBSEEKER" | "COMPANY" | "ADMIN";

// /* =======================
//    User (Auth)
// ======================= */
// export interface User {
//   _id: string;
//   name: string;
//   email: string;
//   role: Role;
// }

// /* =======================
//    JobSeeker Profile
// ======================= */
// export interface JobSeeker {
//   _id: string;
//   user: string;
//   mobile?: string;
//   skills?: string[];
//   // add more fields later if needed
// }

// /* =======================
//    Auth Context Type
// ======================= */
// export interface AuthContextType {
//   user: User | null;
//   jobSeeker: JobSeeker | null;

//   isAuthenticated: boolean;

//   setUser: (user: User) => void;
//   setJobSeeker: (jobSeeker: JobSeeker) => void;

//   logout: () => void;
// }

// /* =======================
//    Context
// ======================= */
// export const AuthContext = createContext<AuthContextType | null>(null);

import { createContext } from "react";

/* =======================
   Roles
======================= */
export type Role = "JOBSEEKER" | "COMPANY" | "ADMIN";

/* =======================
   User (Auth)
======================= */
export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
}

/* =======================
   JobSeeker Profile
======================= */
export interface JobSeekerEducation {
  _id: string;
  degree: string;
  institution: string;
}

export interface JobSeekerWorkExperience {
  _id: string;
  companyName: string;
  role: string;
  isCurrent: boolean;
}

export interface JobSeeker {
  _id: string;
  user: string;

  profilePhoto?: string;
  resume?: string;

  gender?: "Male" | "Female" | "Other";
  dob?: string; // ISO string
  status?: "Fresher" | "Experienced";

  education?: JobSeekerEducation[];
  workExperience?: JobSeekerWorkExperience[];

  skills?: string[];

  createdAt?: string;
  updatedAt?: string;
}

/* =======================
   Auth Context Type
======================= */
export interface AuthContextType {
  user: User | null;
  jobSeeker: JobSeeker | null;

  isAuthenticated: boolean;

  setUser: (user: User) => void;
  setJobSeeker: (jobSeeker: JobSeeker) => void;

  logout: () => void;
}

/* =======================
   Context
======================= */
export const AuthContext = createContext<AuthContextType | null>(null);
