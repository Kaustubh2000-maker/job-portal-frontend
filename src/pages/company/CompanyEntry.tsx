import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { AuthContext } from "../../auth/AuthContext";
import { toast } from "react-toastify";

export default function CompanyEntry() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (!auth?.user) return;

    const checkCompanyAccess = async () => {
      try {
        const res = await api.get("/company-users/check");

        // ❌ User has NOT applied to any company
        if (!res.data.exists) {
          auth.setCompany(null as any);
          auth.setCompanyUser(null as any);
          navigate("/company/select", { replace: true });
          return;
        }

        const companyUser = {
          companyUserId: res.data.data.companyUserId,
          role: res.data.data.role,
          status: res.data.data.status,
          company: res.data.data.company,
        };

        // ✅ SAVE TO AUTH CONTEXT
        auth.setCompany(res.data.data.company);
        auth.setCompanyUser(companyUser);

        // ✅ Approved → Dashboard
        if (companyUser.status === "APPROVED") {
          navigate("/company/dashboard", { replace: true });
          return;
        }

        // ⏳ Pending / ❌ Rejected → Select page
        navigate("/company/select", { replace: true });
      } catch (error: any) {
        toast.error("Failed to verify company access");
        navigate("/", { replace: true });
      }
    };

    checkCompanyAccess();
  }, [auth, navigate]);

  return <div>Loading company access...</div>;
}
