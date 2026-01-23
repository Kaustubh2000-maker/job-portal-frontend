import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { companiesService } from "../../services/companies.service";
import { companyUserService } from "../../services/companyuser.service";
import { AuthContext } from "../../auth/AuthContext";
import { toast } from "react-toastify";

interface Company {
  _id: string;
  name: string;
  location: string;
}

export default function CompanySelect() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext)!;
  const userId = auth.user!._id;

  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [appliedCompanyId, setAppliedCompanyId] = useState<string | null>(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await companiesService.getAllCompanies();
      setCompanies(res.data.companies || []);
    } catch {
      toast.error("Failed to load companies");
    } finally {
      setLoading(false);
    }
  };

  const applyToCompany = async (companyId: string) => {
    try {
      await companyUserService.applyToCompany({
        user: userId,
        company: companyId,
      });

      setAppliedCompanyId(companyId);
      toast.success("Request sent. Waiting for approval.");
    } catch (error: any) {
      toast.error(error?.message || "Failed to apply");
    }
  };

  if (loading) return <div>Loading companies...</div>;

  /* =========================
     WAITING STATE
  ========================= */
  if (appliedCompanyId) {
    return (
      <div className="js-company-select js-company-select-waiting">
        <h2 className="js-company-select-title">Request Submitted</h2>
        <p className="js-company-select-pending">
          Your request has been sent.
          <br />
          Please wait for company approval.
        </p>
      </div>
    );
  }

  /* =========================
     SELECT COMPANY
  ========================= */
  return (
    <div className="js-company-select">
      <h2 className="js-company-select-title">Select Company</h2>

      <div className="js-company-select-list">
        {companies.map((company) => (
          <div key={company._id} className="js-company-select-card">
            <h3>{company.name}</h3>
            <p>{company.location}</p>

            <button
              className="js-company-select-apply-btn"
              onClick={() => applyToCompany(company._id)}
            >
              Apply
            </button>
          </div>
        ))}
      </div>

      <button
        className="js-company-create-btn"
        onClick={() => navigate("/company/create")}
      >
        + Create Company
      </button>
    </div>
  );
}
