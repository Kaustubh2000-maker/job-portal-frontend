import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { companyUserService } from "../services/companyuser.service";

export default function CompanyProtectedRoute({
  children,
}: {
  children: ReactNode;
}) {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const res = await companyUserService.checkMyCompanyStatus();

        if (res.exists && res.data.status === "APPROVED") {
          setAllowed(true);
        } else {
          setAllowed(false);
        }
      } catch {
        setAllowed(false);
      }
    };

    checkAccess();
  }, []);

  // ⏳ No blink
  if (allowed === null) {
    return <div>Checking access...</div>;
  }

  // ❌ Block access
  if (!allowed) {
    return <Navigate to="/company" replace />;
  }

  // ✅ Allow
  return <>{children}</>;
}
