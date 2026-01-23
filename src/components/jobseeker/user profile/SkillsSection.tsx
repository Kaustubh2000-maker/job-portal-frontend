import { useContext, useState } from "react";
import { AuthContext } from "../../../auth/AuthContext";
import { jobSeekerService } from "../../../services/jobseeker.service";
import { toast } from "react-toastify";

export default function SkillsSection() {
  const auth = useContext(AuthContext)!;
  const { user, jobSeeker, setJobSeeker } = auth;

  const [skills, setSkills] = useState<string[]>(jobSeeker!.skills || []);
  const [newSkill, setNewSkill] = useState("");
  const [saving, setSaving] = useState(false);

  /* ---------- ADD + AUTO SAVE ---------- */
  const addSkill = async () => {
    const skill = newSkill.trim();
    if (!skill || skills.includes(skill)) return;

    const updatedSkills = [...skills, skill];
    setSkills(updatedSkills);
    setNewSkill("");

    try {
      setSaving(true);
      const res = await jobSeekerService.updateProfile(user!._id, {
        skills: updatedSkills,
      });
      setJobSeeker(res.data.jobSeeker);

      toast.success("Skill Added");
    } finally {
      setSaving(false);
    }
  };

  /* ---------- REMOVE + AUTO SAVE ---------- */
  const removeSkill = async (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);

    try {
      setSaving(true);
      const res = await jobSeekerService.updateProfile(user!._id, {
        skills: updatedSkills,
      });
      setJobSeeker(res.data.jobSeeker);
      toast.success("Skill Removed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="js-profile-section js-profile-skills">
      <h3 className="js-profile-skills-title">Skills</h3>

      {/* ADD SKILL */}
      <div className="js-profile-skills-input-row">
        <input
          className="js-profile-skills-input"
          value={newSkill}
          placeholder="Enter skill"
          onChange={(e) => setNewSkill(e.target.value.replace(/\s+/g, ""))} // 🚫 no spaces
          onKeyDown={(e) => e.key === "Enter" && addSkill()}
        />

        <button
          className="js-profile-skills-add-btn"
          type="button"
          onClick={addSkill}
          disabled={saving}
        >
          Add
        </button>
      </div>

      {/* SKILLS LIST */}
      <div className="js-profile-skills-list">
        {skills.length === 0 && (
          <p className="js-profile-skills-empty">No skills added</p>
        )}

        {skills.map((skill, i) => (
          <div key={i} className="js-profile-skill-item">
            <span className="js-profile-skill-text">{skill}</span>
            <button
              className="js-profile-skill-remove-btn"
              type="button"
              onClick={() => removeSkill(i)}
              disabled={saving}
              aria-label={`Remove ${skill}`}
            >
              <span className="material-symbols-outlined js-profile-skill-remove-btn-icon">
                close
              </span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
