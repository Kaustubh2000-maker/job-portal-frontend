import { Routes, Route, Navigate } from "react-router-dom";
import JobseekerNavbar from "../../components/jobseeker/Navbar";

// dashboard components
import Home from "../../components/jobseeker/Home";
import Jobs from "../../components/jobseeker/Jobs";
import Companies from "../../components/jobseeker/Companies";
import AppliedJobs from "../../components/jobseeker/AppliedJobs";

export default function JobseekerDashboard() {
  return (
    <div className="jobseeker-dashboard">
      {/* NAVBAR */}
      <JobseekerNavbar />

      {/* MIDDLE CONTENT */}
      <main className="jobseeker-content">
        <Routes>
          <Route index element={<Home />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="companies" element={<Companies />} />
          <Route path="applied" element={<AppliedJobs />} />

          {/* fallback */}
          <Route path="*" element={<Navigate to="" replace />} />
        </Routes>
      </main>

      {/* FOOTER */}
      <footer className="jobseeker-footer">© Job Portal</footer>
    </div>
  );
}
