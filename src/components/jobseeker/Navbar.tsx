import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";

export default function JobseekerNavbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <nav className="jobseeker-navbar">
      <div className="jsn-logo-div">
        <h1 className="jsn-logo">JobSearch</h1>
      </div>

      <div className="jsn-links">
        <NavLink to="/jobseeker/dashboard" end className="jsn-nav-link">
          Home
        </NavLink>

        <NavLink to="/jobseeker/dashboard/jobs" className="jsn-nav-link">
          Jobs
        </NavLink>

        <NavLink to="/jobseeker/dashboard/companies" className="jsn-nav-link">
          Companies
        </NavLink>

        <NavLink to="/jobseeker/dashboard/applied" className="jsn-nav-link">
          Applied Jobs
        </NavLink>
        <NavLink to="/jobseeker/dashboard/profile" className="jsn-nav-link">
          Profile
        </NavLink>

        <button
          className="jsn-logout-btn"
          onClick={() => {
            logout();
            navigate("/", { replace: true });
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
