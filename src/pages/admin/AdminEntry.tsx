import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/useAuth";

export default function AdminEntry() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "ADMIN") {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [user, navigate]);

  return <div>Redirecting to admin dashboard...</div>;
}
