import { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminMain from "../../components/admin/AdminMain";
import { AdminProvider } from "../../context/admin/AdminContext";

export default function AdminDashboard() {
  const [open, setOpen] = useState(false);

  return (
    <AdminProvider>
      <div className={`admin-dashboard ${open ? "open" : ""}`}>
        <div className="admin-overlay" onClick={() => setOpen(false)}></div>

        <AdminSidebar onClose={() => setOpen(false)} />

        <AdminMain />

        <button className="admin-toggle-btn" onClick={() => setOpen(!open)}>
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </AdminProvider>
  );
}
