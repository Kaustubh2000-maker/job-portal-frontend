import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth/useAuth";
import type { ReactNode } from "react";

const ProtectedRoute = ({
  children,
  allowedRole,
}: {
  children: ReactNode;
  allowedRole?: "JOBSEEKER" | "COMPANY" | "ADMIN";
}) => {
  const { user } = useAuth();

  // not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // role mismatch
  if (allowedRole && user.role !== allowedRole) {
    if (user.role === "JOBSEEKER") return <Navigate to="/jobseeker" replace />;
    if (user.role === "COMPANY") return <Navigate to="/company" replace />;
    if (user.role === "ADMIN") return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
