import { useAdmin } from "../../context/admin/AdminContext";
import { useAuth } from "../../context/auth/useAuth";

export default function AdminSidebar({ onClose }: { onClose: () => void }) {
  const { activeSection, setActiveSection } = useAdmin();
  const { logout } = useAuth();

  const itemClass = (section: string) =>
    `admin-sidebar-item ${activeSection === section ? "active" : ""}`;

  return (
    <aside className="admin-sidebar">
      <h3 className="admin-sidebar-title">Admin Section</h3>

      <ul className="admin-sidebar-menu">
        <li
          className={itemClass("USERS")}
          onClick={() => {
            setActiveSection("USERS");
            onClose();
          }}
        >
          <span className="material-symbols-outlined admin-sidebar-icon">
            people
          </span>
          <span className="admin-sidebar-text">Users</span>
        </li>

        <li
          className={itemClass("COMPANIES")}
          onClick={() => {
            setActiveSection("COMPANIES");
            onClose();
          }}
        >
          <span className="material-symbols-outlined admin-sidebar-icon">
            business
          </span>
          <span className="admin-sidebar-text">Companies</span>
        </li>

        <li
          className={itemClass("APPLICATIONS")}
          onClick={() => {
            setActiveSection("APPLICATIONS");
            onClose();
          }}
        >
          <span className="material-symbols-outlined admin-sidebar-icon">
            description
          </span>
          <span className="admin-sidebar-text">Applications</span>
        </li>
      </ul>

      <div className="admin-sidebar-logout">
        <button
          className="admin-sidebar-logout-btn"
          onClick={() => {
            logout();
            onClose();
          }}
        >
          <span className="material-symbols-outlined admin-sidebar-icon">
            logout
          </span>
          <span className="admin-sidebar-text">Logout</span>
        </button>
      </div>
    </aside>
  );
}
