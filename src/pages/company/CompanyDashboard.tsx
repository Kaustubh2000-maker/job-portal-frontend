import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CompanyUsersSection from "../../components/company/CompanyUsersSection";
import JobsSection from "../../components/company/JobsSection";
import ApplicationsSection from "../../components/company/ApplicationsSection";

import { useAuth } from "../../context/auth/useAuth";

type Section = "JOBS" | "APPLICATIONS" | "USERS";

export default function CompanyDashboard() {
  const { company, companyUser, logout } = useAuth();
  const navigate = useNavigate();
  const role = companyUser?.role;

  const [activeSection, setActiveSection] = useState<Section>("JOBS");
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  return (
    <div className=" company-dashboard">
      <div className="company-container">
        {/* HEADER */}
        <div className="company-dashboard-header">
          <h2 className="company-dashboard-title">{company?.name}</h2>
          <div className="company-dashboard-meta">
            <span className="company-dashboard-location">
              {company?.location}
            </span>
            {company?.website && (
              <a
                className="company-dashboard-website"
                href={company.website}
                target="_blank"
                rel="noreferrer"
              >
                {/* {company.website} */}
                Website
              </a>
            )}
            <button
              className="js-company-dash-logout-btn"
              onClick={() => {
                logout();
                navigate("/", { replace: true });
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* NAV */}
        <div className="company-dashboard-sec-btns">
          <button
            className={`company-dashboard-active-btn ${
              activeSection === "JOBS" ? "active" : ""
            }`}
            onClick={() => setActiveSection("JOBS")}
          >
            Jobs
          </button>

          <button
            className={`company-dashboard-active-btn ${
              activeSection === "APPLICATIONS" ? "active" : ""
            }`}
            onClick={() => setActiveSection("APPLICATIONS")}
          >
            Applications
          </button>

          {role === "OWNER" && (
            <button
              className={`company-dashboard-active-btn ${
                activeSection === "USERS" ? "active" : ""
              }`}
              onClick={() => setActiveSection("USERS")}
            >
              Company Users
            </button>
          )}
        </div>

        {/* CONTENT */}
        <div className="company-dashboard-content">
          {activeSection === "JOBS" && (
            <JobsSection
              onSelectJob={(jobId) => {
                setSelectedJobId(jobId);
                setActiveSection("APPLICATIONS");
              }}
            />
          )}

          {activeSection === "APPLICATIONS" && (
            <ApplicationsSection jobId={selectedJobId} />
          )}

          {activeSection === "USERS" && role === "OWNER" && (
            <CompanyUsersSection />
          )}
        </div>
      </div>
    </div>
  );
}
