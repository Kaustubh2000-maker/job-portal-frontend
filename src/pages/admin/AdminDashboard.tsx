import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminMain from "../../components/admin/AdminMain";
import { AdminProvider } from "../../context/admin/AdminContext";

export default function AdminDashboard() {
  return (
    <AdminProvider>
      <div className="admin-dashboard">
        <AdminSidebar />
        <AdminMain />
      </div>
    </AdminProvider>
  );
}
