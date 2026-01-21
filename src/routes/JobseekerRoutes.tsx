import { Routes, Route } from "react-router-dom";
import JobseekerEntry from "../pages/jobseeker/JobseekerEntry";
import JobseekerOnboarding from "../pages/jobseeker/JobseekerOnboarding";
import JobseekerDashboard from "../pages/jobseeker/JobseekerDashboard";

export default function JobseekerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<JobseekerEntry />} />
      <Route path="onboarding" element={<JobseekerOnboarding />} />
      <Route path="dashboard/*" element={<JobseekerDashboard />} />
    </Routes>
  );
}
