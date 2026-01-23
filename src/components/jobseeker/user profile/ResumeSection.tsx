import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../../auth/AuthContext";
import { jobSeekerService } from "../../../services/jobseeker.service";
import { getFileUrl } from "../../../utils/fileUrl";
import { toast } from "react-toastify";

export default function ResumeSection() {
  const auth = useContext(AuthContext)!;
  const { user, jobSeeker, setJobSeeker } = auth;

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [saving, setSaving] = useState(false);

  const handleResumeChange = async (file: File) => {
    try {
      setSaving(true);

      const res = await jobSeekerService.updateProfile(user!._id, {
        resume: file,
      });

      setJobSeeker(res.data.jobSeeker);
      toast.success("Resume updated");
    } catch {
      toast.error("Failed to update resume");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="js-profile-section js-profile-resume">
      {/* <h3 className="js-profile-resume-title">Resume</h3> */}

      <div className="js-profile-resume-div">
        {jobSeeker?.resume && (
          <a
            href={getFileUrl(jobSeeker.resume)}
            target="_blank"
            rel="noreferrer"
            className="js-profile-resume-link"
          >
            View Resume
          </a>
        )}

        <button
          type="button"
          className="js-profile-resume-update-btn"
          disabled={saving}
          onClick={() => fileInputRef.current?.click()}
        >
          {saving ? "Updating..." : "Update Resume"}
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleResumeChange(file);
            }
          }}
        />
      </div>
    </section>
  );
}
