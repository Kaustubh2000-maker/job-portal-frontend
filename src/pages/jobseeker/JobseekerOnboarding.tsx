import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";

export default function JobseekerOnboarding() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [status, setStatus] = useState<"Fresher" | "Experienced" | "">("");
  const [skills, setSkills] = useState<string[]>([]);

  const [education, setEducation] = useState([{ degree: "", institution: "" }]);

  const [workExperience, setWorkExperience] = useState([
    { companyName: "", role: "" },
  ]);

  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [resume, setResume] = useState<File | null>(null);

  /* ---------- education ---------- */

  const addEducation = () =>
    setEducation([...education, { degree: "", institution: "" }]);

  const removeEducation = (index: number) =>
    setEducation(education.filter((_, i) => i !== index));

  /* ---------- experience ---------- */

  const addExperience = () =>
    setWorkExperience([...workExperience, { companyName: "", role: "" }]);

  const removeExperience = (index: number) =>
    setWorkExperience(workExperience.filter((_, i) => i !== index));

  /* ---------- submit ---------- */

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("gender", gender);
      formData.append("dob", dob);
      formData.append("status", status);
      formData.append("skills", JSON.stringify(skills));
      formData.append("education", JSON.stringify(education));

      if (status === "Experienced") {
        formData.append("workExperience", JSON.stringify(workExperience));
      }

      if (profilePhoto) formData.append("profilePhoto", profilePhoto);
      if (resume) formData.append("resume", resume);

      await api.post("/jobseekers", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Profile completed successfully");
      navigate("/jobseeker/dashboard", { replace: true });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- UI ---------- */

  return (
    <div className="jbo-page">
      <div className="jbo-container">
        <h2 className="jbo-heading">Complete Your Profile</h2>

        <div className="jbo-grid jbo-grid-3-col">
          {/* Gender */}

          <div className="jbo-radio-group">
            <label className="jbo-radio-group-label">Gender : </label>
            <div className="jbo-radio-group-inner-div">
              <label className="jbo-radio-group-radio-label">
                <input
                  className="jbo-radio-group-radio-input"
                  type="radio"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Male
              </label>

              <label className="jbo-radio-group-radio-label">
                <input
                  className="jbo-radio-group-radio-input"
                  type="radio"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Female
              </label>
            </div>
          </div>

          {/* Status */}
          <div className="jbo-radio-group">
            <label className="jbo-radio-group-label">Status : </label>
            <div className="jbo-radio-group-inner-div">
              <label className="jbo-radio-group-radio-label">
                <input
                  className="jbo-radio-group-radio-input"
                  type="radio"
                  value="Fresher"
                  checked={status === "Fresher"}
                  onChange={(e) => setStatus(e.target.value as any)}
                />
                Fresher
              </label>

              <label className="jbo-radio-group-radio-label">
                <input
                  className="jbo-radio-group-radio-input"
                  type="radio"
                  value="Experienced"
                  checked={status === "Experienced"}
                  onChange={(e) => setStatus(e.target.value as any)}
                />
                Experienced
              </label>
            </div>
          </div>
          {/* DOB */}
          <div className="jbo-date-group">
            <label className="jbo-date-label">Date of Birth : </label>
            <input
              className="jbo-date-input"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
        </div>

        {/* Skills */}
        <div className="jbo-skill-div">
          <label className="jbo-label">Skills : </label>
          <input
            className="jbo-input-skill"
            placeholder="Comma separated skills"
            onChange={(e) =>
              setSkills(e.target.value.split(",").map((s) => s.trim()))
            }
          />
        </div>

        {/* Education */}
        <div className="jbo-obj-data-div">
          <h4 className="jbo-obj-data-heading">Education</h4>
          {education.map((edu, i) => (
            <div key={i} className="jbo-obj-div">
              <div className="jbo-label-input-div">
                <label className="jbo-label">Degree : </label>
                <input
                  className="jbo-input-text"
                  value={edu.degree}
                  onChange={(e) => {
                    const copy = [...education];
                    copy[i].degree = e.target.value;
                    setEducation(copy);
                  }}
                />
              </div>
              <div className="jbo-label-input-div">
                <label className="jbo-label">Institution : </label>
                <input
                  className="jbo-input-text"
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
                  className="jbo-obj-del-btn"
                  onClick={() => removeEducation(i)}
                >
                  <span className="material-symbols-outlined jbo-obj-del-icon">
                    delete
                  </span>
                </button>
              )}
            </div>
          ))}
          <button className="jbo-obj-add-btn" onClick={addEducation}>
            + Add Education
          </button>
        </div>

        {/* Experience (ONLY IF EXPERIENCED) */}

        {status === "Experienced" && (
          <div className="jbo-obj-data-div">
            <h4 className="jbo-obj-data-heading">Work Experience</h4>

            {workExperience.map((exp, i) => (
              <div key={i} className="jbo-obj-div">
                <div className="jbo-label-input-div">
                  <label className="jbo-label">Company Name : </label>
                  <input
                    className="jbo-input-text"
                    value={exp.companyName}
                    onChange={(e) => {
                      const copy = [...workExperience];
                      copy[i].companyName = e.target.value;
                      setWorkExperience(copy);
                    }}
                  />
                </div>

                <div className="jbo-label-input-div">
                  <label className="jbo-label">Role : </label>
                  <input
                    className="jbo-input-text"
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
                    className="jbo-obj-del-btn"
                    onClick={() => removeExperience(i)}
                  >
                    <span className="material-symbols-outlined jbo-obj-del-icon">
                      delete
                    </span>
                  </button>
                )}
              </div>
            ))}

            <button className="jbo-obj-add-btn" onClick={addExperience}>
              + Add Experience
            </button>
          </div>
        )}

        <div className="jbo-file-upload-group">
          {/* Files */}
          <div className="jbo-file-div">
            <label className="jbo-label">Profile Photo :</label>
            <input
              className="jbo-input-upload"
              type="file"
              onChange={(e) => setProfilePhoto(e.target.files?.[0] || null)}
            />
          </div>

          <div className="jbo-file-div">
            <label className="jbo-label">Resume : </label>
            <input
              className="jbo-input-upload"
              type="file"
              onChange={(e) => setResume(e.target.files?.[0] || null)}
            />
          </div>
        </div>

        <button
          className="jbo-submit-btn"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "Saving..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
