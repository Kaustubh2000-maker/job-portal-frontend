import { useContext, useState } from "react";
// import { AuthContext } from "../../auth/AuthContext";
// import { jobSeekerService } from "../../services/jobseeker.service";
import { AuthContext } from "../../../context/auth/AuthContext";
import { jobSeekerService } from "../../../services/jobseeker.service";
import { toast } from "react-toastify";

interface Education {
  degree: string;
  institution: string;
}

export default function EducationSection() {
  const auth = useContext(AuthContext)!;
  const { user, jobSeeker, setJobSeeker } = auth;

  const [education, setEducation] = useState<Education[]>(
    jobSeeker?.education?.length
      ? jobSeeker.education
      : [{ degree: "", institution: "" }]
  );

  const [saving, setSaving] = useState(false);

  /* ---------- handlers ---------- */

  const addEducation = () => {
    setEducation([...education, { degree: "", institution: "" }]);
  };

  const removeEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const saveEducation = async () => {
    try {
      setSaving(true);

      const res = await jobSeekerService.updateProfile(user!._id, {
        education,
      });
      setJobSeeker(res.data.jobSeeker);
      toast.success("Educaion updated");
    } catch {
      toast.error("Educaion updated failed");
    } finally {
      setSaving(false);
    }
  };

  /* ---------- UI ---------- */

  return (
    <section className="js-profile-section js-profile-edu-section">
      <h3 className="js-profile-edu-heading">Education</h3>

      {education.map((edu, i) => (
        <div key={i} className="js-profile-obj-row">
          <div className="js-profile-edu-input-div">
            <label className="js-profile-edu-label">Degree</label>
            <input
              className="js-profile-edu-input"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => {
                const copy = [...education];
                copy[i].degree = e.target.value;
                setEducation(copy);
              }}
            />
          </div>

          <div className="js-profile-edu-input-div">
            <label className="js-profile-edu-label">Institution</label>
            <input
              className="js-profile-edu-input"
              placeholder="Institution"
              value={edu.institution}
              onChange={(e) => {
                const copy = [...education];
                copy[i].institution = e.target.value;
                setEducation(copy);
              }}
            />
          </div>

          {education.length > 1 && (
            <button
              className="js-profile-edu-del-btn"
              type="button"
              onClick={() => removeEducation(i)}
            >
              <span className="material-symbols-outlined js-profile-edu-del-btn-icon">
                delete
              </span>
            </button>
          )}
        </div>
      ))}

      <div className="js-profile-edu-add-save-btn-div">
        <button
          className="js-profile-edu-add-btn"
          type="button"
          onClick={addEducation}
        >
          + Add Education
        </button>

        <button
          className="js-profile-edu-save-btn"
          onClick={saveEducation}
          disabled={saving}
        >
          {/* {saving ? "Saving..." : "Save Education"} */}
          Save Education
        </button>
      </div>
    </section>
  );
}
