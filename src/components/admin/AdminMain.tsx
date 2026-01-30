import { useAdmin } from "../../context/admin/AdminContext";
import AdminUsersSection from "./AdminUsersSection";
import AdminCompaniesSection from "./AdminCompaniesSection";
import AdminJobsSection from "./AdminJobsSection";
import AdminApplicationsSection from "./AdminApplicationsSection";

export default function AdminMain() {
  const { activeSection } = useAdmin();

  return (
    <div className="admin-main">
      {activeSection === "USERS" && <AdminUsersSection />}
      {activeSection === "COMPANIES" && <AdminCompaniesSection />}
      {activeSection === "JOBS" && <AdminJobsSection />}
      {activeSection === "APPLICATIONS" && <AdminApplicationsSection />}
    </div>
  );
}
