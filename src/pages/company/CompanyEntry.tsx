import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { AuthContext } from "../../context/auth/AuthContext";
import { toast } from "react-toastify";

export default function CompanyEntry() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (!auth?.user) return;

    console.log("user in entry", auth?.user);

    const checkCompanyAccess = async () => {
      try {
        const res = await api.get("/company-users/check");

        console.log("res data entry ", res);

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

        auth.setCompany(res.data.data.company);
        auth.setCompanyUser(companyUser);

        if (companyUser.status === "APPROVED") {
          navigate("/company/dashboard", { replace: true });
          return;
        }

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
