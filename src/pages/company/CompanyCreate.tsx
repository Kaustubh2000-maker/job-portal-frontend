import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { companiesService } from "../../services/companies.service";
import { AuthContext } from "../../auth/AuthContext";
import { toast } from "react-toastify";

export default function CompanyCreate() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext)!;
  const userId = auth.user!._id;

  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [saving, setSaving] = useState(false);

  const handleCreateCompany = async () => {
    if (!name || !industry || !location) {
      toast.error("Please fill required fields");
      return;
    }

    try {
      setSaving(true);

      await companiesService.createCompany({
        name,
        industry,
        website,
        location,
        createdBy: userId,
      });

      toast.success("Company created successfully");
      navigate("/company/dashboard", { replace: true });
    } catch (error: any) {
      toast.error(error?.message || "Failed to create company");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="js-company-create">
      <h2 className="js-company-create-title">Create Company</h2>

      <input
        className="js-company-create-input"
        placeholder="Company Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="js-company-create-input"
        placeholder="Industry"
        value={industry}
        onChange={(e) => setIndustry(e.target.value)}
      />

      <input
        className="js-company-create-input"
        placeholder="Website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
      />

      <input
        className="js-company-create-input"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <button
        className="js-company-create-btn"
        onClick={handleCreateCompany}
        disabled={saving}
      >
        {saving ? "Creating..." : "Create Company"}
      </button>
    </div>
  );
}
