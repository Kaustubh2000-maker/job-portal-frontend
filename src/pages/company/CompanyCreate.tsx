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
  const [description, setdescription] = useState("");
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
        description,
        location,
        createdBy: userId,
      });

      toast.success("Company created successfully");
      navigate("/company/dashboard", { replace: true });
    } catch (error: any) {
      console.log(error);

      toast.error(error?.message || "Failed to create company");
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
