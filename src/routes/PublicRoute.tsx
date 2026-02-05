import type { ReactElement } from "react";

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth/useAuth";

const PublicRoute = ({ children }: { children: ReactElement }) => {
  const { user } = useAuth();

  if (user) {
    if (user.role === "JOBSEEKER") {
      return <Navigate to="/jobseeker" replace />;
    }

    if (user.role === "COMPANY") {
      return <Navigate to="/company" replace />;
    }

    if (user.role === "ADMIN") {
      return <Navigate to="/admin" replace />;
    }
  }

  return children;
};

export default PublicRoute;
