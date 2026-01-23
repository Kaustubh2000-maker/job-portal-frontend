import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";

export default function CompanyEntry() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkCompany = async () => {
      try {
        await api.get("/companies/mycompany");
        navigate("/company/dashboard", { replace: true });
      } catch (error: any) {
        if (error?.response?.status === 500) {
          navigate("/company/select", { replace: true });
        } else {
          toast.error("Something went wrong");
        }
      }
    };

    checkCompany();
  }, [navigate]);

  return <div>Loading...</div>;
}
