import { useContext, useState } from "react";
import { AuthContext } from "../../../auth/AuthContext";
import { jobSeekerService } from "../../../services/jobseeker.service";
import { toast } from "react-toastify";

interface WorkExperience {
  companyName: string;
  role: string;
  isCurrent?: boolean;
}

export default function ExperienceSection() {
  const auth = useContext(AuthContext)!;
  const { user, jobSeeker, setJobSeeker } = auth;

  // ✅ HOOKS MUST ALWAYS RUN
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>(
    jobSeeker?.workExperience?.length
      ? jobSeeker.workExperience
      : [{ companyName: "", role: "", isCurrent: false }]
  );

  const [saving, setSaving] = useState(false);

  // ✅ CONDITIONAL RENDER AFTER HOOKS
  if (jobSeeker?.status !== "Experienced") {
    return null;
  }

  /* ---------- handlers ---------- */

  const addExperience = () => {
    setWorkExperience([
      ...workExperience,
      { companyName: "", role: "", isCurrent: false },
    ]);
  };

  const removeExperience = (index: number) => {
    setWorkExperience(workExperience.filter((_, i) => i !== index));
  };

  const saveExperience = async () => {
    try {
      setSaving(true);

      const res = await jobSeekerService.updateProfile(user!._id, {
        workExperience,
      });

      setJobSeeker(res.data.jobSeeker);

      toast.success("Experience updated");
    } catch {
      toast.error("Experience updated failed");
    } finally {
      setSaving(false);
    }
  };

  /* ---------- UI ---------- */

  return (
    <section className="js-profile-section js-profile-exp-secion">
      <h3 className="js-profile-exp-heading">Work Experience</h3>

      {workExperience.map((exp, i) => (
        <div key={i} className="js-profile-obj-row">
          <div className="js-profile-exp-input-div">
            <label className="js-profile-exp-label">Company</label>
            <input
              className="js-profile-exp-input"
              placeholder="Company Name"
              value={exp.companyName}
              onChange={(e) => {
                const copy = [...workExperience];
                copy[i].companyName = e.target.value;
                setWorkExperience(copy);
              }}
            />
          </div>
          <div className="js-profile-exp-input-div">
            <label className="js-profile-exp-label">Role</label>
            <input
              placeholder="Role"
              className="js-profile-exp-input"
              value={exp.role}
              onChange={(e) => {
                const copy = [...workExperience];
                copy[i].role = e.target.value;
                setWorkExperience(copy);
              }}
            />
          </div>

          {workExperience.length > 1 && (
            <button
              className="js-profile-exp-del-btn"
              type="button"
              onClick={() => removeExperience(i)}
            >
              <span className="material-symbols-outlined js-profile-exp-del-btn-icon">
                delete
              </span>
            </button>
          )}
        </div>
      ))}

      <div className="js-profile-exp-add-save-btn-div">
        <button
          className="js-profile-exp-add-btn"
          type="button"
          onClick={addExperience}
        >
          + Add Experience
        </button>

        <button
          className="js-profile-exp-save-btn"
          onClick={saveExperience}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Experience"}
        </button>
      </div>
    </section>
  );
}
