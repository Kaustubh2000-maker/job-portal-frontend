export default function CompanyDashboard() {
  return (
    <div className="js-company-dashboard">
      <h2 className="js-company-dashboard-title">Company Dashboard</h2>

      <div className="js-company-dashboard-grid">
        {/* OVERVIEW */}
        <div className="js-company-dashboard-card">
          <h3 className="js-company-dashboard-card-title">Overview</h3>
          <p className="js-company-dashboard-card-text">
            Company summary and basic statistics
          </p>
        </div>

        {/* JOBS */}
        <div className="js-company-dashboard-card">
          <h3 className="js-company-dashboard-card-title">Jobs</h3>
          <p className="js-company-dashboard-card-text">
            Create and manage job postings
          </p>
        </div>

        {/* APPLICATIONS */}
        <div className="js-company-dashboard-card">
          <h3 className="js-company-dashboard-card-title">Applications</h3>
          <p className="js-company-dashboard-card-text">
            View and manage job applications
          </p>
        </div>

        {/* SETTINGS */}
        <div className="js-company-dashboard-card">
          <h3 className="js-company-dashboard-card-title">Settings</h3>
          <p className="js-company-dashboard-card-text">
            Company profile and team management
          </p>
        </div>
      </div>
    </div>
  );
}
