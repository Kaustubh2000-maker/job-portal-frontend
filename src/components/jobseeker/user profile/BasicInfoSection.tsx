import { useContext, useState } from "react";
import { AuthContext } from "../../../auth/AuthContext";
import { jobSeekerService } from "../../../services/jobseeker.service";
import { toast } from "react-toastify";

export default function BasicInfoSection() {
  const auth = useContext(AuthContext)!;
  const { user, jobSeeker, setJobSeeker } = auth;

  const initialGender = jobSeeker!.gender || "";
  const initialDob = jobSeeker!.dob ? jobSeeker!.dob.split("T")[0] : "";
  const initialStatus = jobSeeker!.status || "";

  const [gender, setGender] = useState(initialGender);
  const [dob, setDob] = useState(initialDob);
  const [status, setStatus] = useState(initialStatus);
  const [saving, setSaving] = useState(false);

  const isChanged =
    gender !== initialGender || dob !== initialDob || status !== initialStatus;

  const saveBasic = async () => {
    try {
      setSaving(true);

      const payload: any = {
        gender,
        dob,
        status,
      };

      // remove experice if user is fresher
      if (status === "Fresher") {
        payload.workExperience = [];
      }

      const res = await jobSeekerService.updateProfile(user!._id, payload);

      setJobSeeker(res.data.jobSeeker);
      toast.success("Basic info updated");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="js-profile-details">
      <h3 className="js-profile-details-title">Details</h3>

      <div className="js-profile-details-grid">
        <div className="js-profile-details-row">
          <label className="js-profile-details-label">Gender</label>
          <select
            className="js-profile-details-control"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="js-profile-details-row">
          <label className="js-profile-details-label">Date of Birth</label>
          <input
            className="js-profile-details-control"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>

        <div className="js-profile-details-row">
          <label className="js-profile-details-label">Status</label>
          <select
            className="js-profile-details-control"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Fresher">Fresher</option>
            <option value="Experienced">Experienced</option>
          </select>
        </div>

        <button
          className="js-profile-details-save-btn"
          onClick={saveBasic}
          disabled={saving || !isChanged}
        >
          {saving ? "Saving..." : "Save Details"}
        </button>
      </div>
    </section>
  );
}
