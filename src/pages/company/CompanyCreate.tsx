import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { companiesService } from "../../services/companies.service";
import { AuthContext } from "../../context/auth/AuthContext";
import { toast } from "react-toastify";
import api from "../../services/api";

export default function CompanyCreate() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext)!;
  const userId = auth.user!._id;

  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setdescription] = useState("");
  const [location, setLocation] = useState("");
  const [saving, setSaving] = useState(false);

  // const handleCreateCompany = async () => {
  //   if (!name || !industry || !location) {
  //     toast.error("Please fill required fields");
  //     return;
  //   }

  //   try {
  //     setSaving(true);

  //     await companiesService.createCompany({
  //       name,
  //       industry,
  //       website,
  //       description,
  //       location,
  //       createdBy: userId,
  //     });

  //     toast.success("Company created successfully");
  //     navigate("/company/dashboard", { replace: true });
  //   } catch (error: any) {
  //     console.log(error);

  //     toast.error(error?.message || "Failed to create company");
  //   } finally {
  //     setSaving(false);
  //   }
  // };
  const handleCreateCompany = async () => {
    if (!name || !industry || !location) {
      toast.error("Please fill required fields");
      return;
    }

    try {
      setSaving(true);

      // 1️⃣ Create company
      await companiesService.createCompany({
        name,
        industry,
        website,
        description,
        location,
        createdBy: userId,
      });

      // 2️⃣ Fetch company-user mapping immediately
      const res = await api.get("/company-users/check");

      if (!res.data.exists) {
        toast.error("Company created but access not ready. Please refresh.");
        return;
      }

      const companyUser = {
        companyUserId: res.data.data.companyUserId,
        role: res.data.data.role,
        status: res.data.data.status,
        company: res.data.data.company,
      };

      // 3️⃣ Hydrate auth context
      auth.setCompany(res.data.data.company);
      auth.setCompanyUser(companyUser);

      toast.success("Company created successfully");

      // 4️⃣ Navigate
      navigate("/company/dashboard", { replace: true });
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to create company");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="js-company-create-box">
      <button
        className="js-company-create-back-btn"
        onClick={() => navigate("/company/select")}
      >
        Back to select
      </button>
      <h2 className="js-company-create-title">Create Company</h2>

      <div className="js-company-create-grid">
        <div className="js-company-create-label-input-div">
          <label className="js-company-create-label">Name</label>
          <input
            className="js-company-create-input"
            placeholder="Company Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="js-company-create-label-input-div">
          <label className="js-company-create-label">Industry</label>
          <input
            className="js-company-create-input"
            placeholder="Industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          />
        </div>
        <div className="js-company-create-label-input-div">
          <label className="js-company-create-label">description</label>
          <input
            className="js-company-create-input"
            placeholder="Industry"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
          />
        </div>

        <div className="js-company-create-label-input-div">
          <label className="js-company-create-label">Website URL</label>
          <input
            className="js-company-create-input"
            placeholder="Website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div className="js-company-create-label-input-div">
          <label className="js-company-create-label">Locaion</label>
          <input
            className="js-company-create-input"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <button
          className="js-company-create--btn"
          onClick={handleCreateCompany}
          disabled={saving}
        >
          {saving ? "Creating..." : "Create Company"}
        </button>
      </div>
    </div>
  );
}
