import { createContext } from "react";

export type Role = "JOBSEEKER" | "COMPANY" | "ADMIN";

export interface User {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  role: Role;
}

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

export interface Company {
  _id: string;
  name: string;
  industry: string;
  description: string;
  website: string;
  location: string;
  isActive: boolean;
}

export interface CompanyUser {
  companyUserId: string;
  role: "OWNER" | "EMPLOYEE";
  status: "PENDING" | "APPROVED" | "REJECTED";
  company: Company;
}

export interface AuthContextType {
  user: User | null;
  jobSeeker: JobSeeker | null;

  company: Company | null;
  companyUser: CompanyUser | null;

  isAuthenticated: boolean;

  setUser: (user: User) => void;
  setJobSeeker: (jobSeeker: JobSeeker) => void;
  setCompany: (company: Company) => void;
  setCompanyUser: (companyUser: CompanyUser) => void;

  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
