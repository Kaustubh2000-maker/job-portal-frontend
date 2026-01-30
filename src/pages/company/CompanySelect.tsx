import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { companiesService } from "../../services/companies.service";
import { companyUserService } from "../../services/companyuser.service";
import { AuthContext } from "../../context/auth/AuthContext";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth/useAuth";

interface Company {
  _id: string;
  name: string;
  location: string;
}

type ViewState = "LOADING" | "WAITING" | "SELECT";

export default function CompanySelect() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext)!;
  const userId = auth.user!._id;
  const { logout } = useAuth();

  const [companies, setCompanies] = useState<Company[]>([]);
  const [view, setView] = useState<ViewState>("LOADING");
  const [loadingCompanies, setLoadingCompanies] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    checkCompanyUser();
  }, []);

  const checkCompanyUser = async () => {
    try {
      const res = await api.get("/company-users/check");

      if (!res.data.exists) {
        setView("SELECT");
        fetchCompanies();
        return;
      }

      const { status } = res.data.data;
      console.log(status);

      if (status === "APPROVED") {
        navigate("/company/dashboard", { replace: true });
        return;
      }

      if (status === "PENDING") {
        setMessage("Your request is pending approval.");
        setView("WAITING");
        return;
      }

      if (status === "REJECTED") {
        setMessage("Your request was rejected. You can apply again.");
        setView("SELECT");
        fetchCompanies();
        return;
      }
    } catch {
      toast.error("Failed to verify company status");
      setView("SELECT");
      fetchCompanies();
    }
  };

  const fetchCompanies = async () => {
    try {
      setLoadingCompanies(true);
      const res = await companiesService.getAllCompanies();
      setCompanies(res.data.companies || []);
    } catch {
      toast.error("Failed to load companies");
    } finally {
      setLoadingCompanies(false);
    }
  };

  const applyToCompany = async (companyId: string) => {
    try {
      await companyUserService.applyToCompany({
        user: userId,
        company: companyId,
      });

      toast.success("Request sent. Waiting for approval.");
      setView("WAITING");
      setMessage("Your request has been sent. Please wait for approval.");
    } catch (error: any) {
      toast.error(error?.message || "Failed to apply");
    }
  };

  if (view === "LOADING") {
    return <div>Checking company status...</div>;
  }

  if (view === "WAITING") {
    return (
      <div className="js-company-select-div js-company-select-waiting">
        <button
          className="js-company-select-logout-btn"
          onClick={() => {
            logout();
            navigate("/", { replace: true });
          }}
        >
          Logout
        </button>

        <h2 className="js-company-select-title">Request Submitted</h2>
        <p className="js-company-select-pending">
          {message || "Please wait for company approval."}
        </p>
      </div>
    );
  }

  return (
    <div className="js-company-select-div">
      <button
        className="js-company-select-logout-btn"
        onClick={() => {
          logout();
          navigate("/", { replace: true });
        }}
      >
        Logout
      </button>
      <h2 className="js-company-select-title">Select Company</h2>

      {message && <p className="js-company-select-info">{message}</p>}

      {loadingCompanies ? (
        <p>Loading companies...</p>
      ) : (
        <div className="js-company-select-list">
          {companies.map((company) => (
            <div key={company._id} className="js-company-select-card">
              <div>
                <h3 className="js-company-select-card-name">{company.name}</h3>
                <p className="js-company-select-card-locaion">
                  {company.location}
                </p>
              </div>

              <button
                className="js-company-select-apply-btn"
                onClick={() => applyToCompany(company._id)}
              >
                Apply
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        className="js-company-create-btn"
        onClick={() => navigate("/company/create")}
      >
        + Create Company
      </button>
    </div>
  );
}
