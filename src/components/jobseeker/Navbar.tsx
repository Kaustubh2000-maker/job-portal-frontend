import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/auth/useAuth";

export default function JobseekerNavbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="jobseeker-navbar">
        <h1 className="jsn-logo">JobSearch</h1>

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

          <button className="jsn-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="jsn-menu-btn" onClick={() => setMenuOpen(true)}>
          ☰
        </div>
      </nav>

      {menuOpen && (
        <div className="jsn-overlay">
          <span
            className="jsn-overlay-close"
            onClick={() => setMenuOpen(false)}
          >
            ×
          </span>

          <div className="jsn-overlay-links">
            <NavLink
              to="/jobseeker/dashboard"
              end
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/jobseeker/dashboard/jobs"
              onClick={() => setMenuOpen(false)}
            >
              Jobs
            </NavLink>

            <NavLink
              to="/jobseeker/dashboard/companies"
              onClick={() => setMenuOpen(false)}
            >
              Companies
            </NavLink>

            <NavLink
              to="/jobseeker/dashboard/applied"
              onClick={() => setMenuOpen(false)}
            >
              Applied Jobs
            </NavLink>

            <NavLink
              to="/jobseeker/dashboard/profile"
              onClick={() => setMenuOpen(false)}
            >
              Profile
            </NavLink>

            <button className="jsn-overlay-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}
