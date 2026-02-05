import { useContext, useRef, useState } from "react";

import { AuthContext } from "../../../context/auth/AuthContext";
import { jobSeekerService } from "../../../services/jobseeker.service";
import { getFileUrl } from "../../../utils/fileUrl";
import { toast } from "react-toastify";
export default function ProfilePhotoSection() {
  const auth = useContext(AuthContext)!;
  const { user, jobSeeker, setJobSeeker } = auth;

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [saving, setSaving] = useState(false);

  const handlePhotoChange = async (file: File) => {
    try {
      setSaving(true);

      const res = await jobSeekerService.updateProfile(user!._id, {
        profilePhoto: file,
      });

      setJobSeeker(res.data.jobSeeker);
      toast.success("Profile photo updated");
    } catch {
      //   alert("Failed to update profile photo");
      toast.error("Failed to update profile photo");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="js-profile-section js-profile-photo-section">
      <div className="js-profile-photo-wrapper">
        <img
          src={getFileUrl(jobSeeker?.profilePhoto)}
          alt="Profile"
          className="js-profile-photo"
        />

        <span className="js-profile-photo-edit">
          <span
            className="material-symbols-outlined"
            onClick={() => fileInputRef.current?.click()}
            title="Change profile photo"
          >
            edit
          </span>
          Change photo
        </span>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handlePhotoChange(file);
            }
          }}
        />
      </div>

      {saving && <p className="js-profile-photo-loading">Updating...</p>}
    </section>
  );
}
