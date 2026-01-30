// import { useState, useContext } from "react";
// import { AuthContext } from "../../auth/AuthContext";
// import { userService } from "../../services/user.service";
// import { jobSeekerService } from "../../services/jobseeker.service";
// import { getFileUrl } from "../../utils/fileUrl";

// export default function UserProfile() {
//   const auth = useContext(AuthContext);

//   if (!auth || !auth.user || !auth.jobSeeker) {
//     return <div>Loading profile...</div>;
//   }

//   const { user, jobSeeker, setUser, setJobSeeker } = auth;

//   /* =======================
//      USER INFO
//   ======================= */
//   const [name, setName] = useState(user.name);
//   const [email, setEmail] = useState(user.email);
//   const [mobile, setMobile] = useState(user.mobile || "");
//   const [savingUser, setSavingUser] = useState(false);

//   /* =======================
//      BASIC INFO
//   ======================= */
//   const [gender, setGender] = useState(jobSeeker.gender || "");
//   const [dob, setDob] = useState(
//     jobSeeker.dob ? jobSeeker.dob.split("T")[0] : ""
//   );
//   const [status, setStatus] = useState(jobSeeker.status || "");
//   const [savingBasic, setSavingBasic] = useState(false);

//   /* =======================
//      SKILLS
//   ======================= */
//   const [skills, setSkills] = useState<string[]>(jobSeeker.skills || []);
//   const [newSkill, setNewSkill] = useState("");
//   const [savingSkills, setSavingSkills] = useState(false);

//   /* =======================
//      EDUCATION
//   ======================= */
//   const [education, setEducation] = useState(
//     jobSeeker.education || [{ degree: "", institution: "" }]
//   );
//   const [savingEducation, setSavingEducation] = useState(false);

//   /* =======================
//      EXPERIENCE
//   ======================= */
//   const [workExperience, setWorkExperience] = useState(
//     jobSeeker.workExperience || [{ companyName: "", role: "" }]
//   );
//   const [savingExperience, setSavingExperience] = useState(false);

//   /* =======================
//      FILES
//   ======================= */
//   const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
//   const [resume, setResume] = useState<File | null>(null);
//   const [savingPhoto, setSavingPhoto] = useState(false);
//   const [savingResume, setSavingResume] = useState(false);

//   /* =======================
//      HANDLERS
//   ======================= */

//   const updateUserInfo = async () => {
//     try {
//       setSavingUser(true);
//       const res = await userService.updateMe({ name, email, mobile });
//       setUser(res.data.user);
//       alert("User info updated");
//     } finally {
//       setSavingUser(false);
//     }
//   };

//   const updateBasicInfo = async () => {
//     try {
//       setSavingBasic(true);
//       const res = await jobSeekerService.updateProfile(user._id, {
//         gender,
//         dob,
//         status,
//       });
//       setJobSeeker(res.data.jobSeeker);
//       alert("Basic info updated");
//     } finally {
//       setSavingBasic(false);
//     }
//   };

//   const updateSkills = async () => {
//     try {
//       setSavingSkills(true);
//       const res = await jobSeekerService.updateProfile(user._id, { skills });
//       setJobSeeker(res.data.jobSeeker);
//       alert("Skills updated");
//     } finally {
//       setSavingSkills(false);
//     }
//   };

//   const updateEducation = async () => {
//     try {
//       setSavingEducation(true);
//       const res = await jobSeekerService.updateProfile(user._id, {
//         education,
//       });
//       setJobSeeker(res.data.jobSeeker);
//       alert("Education updated");
//     } finally {
//       setSavingEducation(false);
//     }
//   };

//   const updateExperience = async () => {
//     try {
//       setSavingExperience(true);
//       const res = await jobSeekerService.updateProfile(user._id, {
//         workExperience,
//       });
//       setJobSeeker(res.data.jobSeeker);
//       alert("Experience updated");
//     } finally {
//       setSavingExperience(false);
//     }
//   };

//   const updateProfilePhoto = async () => {
//     if (!profilePhoto) return;
//     try {
//       setSavingPhoto(true);
//       const res = await jobSeekerService.updateProfile(user._id, {
//         profilePhoto,
//       });
//       setJobSeeker(res.data.jobSeeker);
//       setProfilePhoto(null);
//       alert("Profile photo updated");
//     } finally {
//       setSavingPhoto(false);
//     }
//   };

//   const updateResume = async () => {
//     if (!resume) return;
//     try {
//       setSavingResume(true);
//       const res = await jobSeekerService.updateProfile(user._id, { resume });
//       setJobSeeker(res.data.jobSeeker);
//       setResume(null);
//       alert("Resume updated");
//     } finally {
//       setSavingResume(false);
//     }
//   };

//   /* =======================
//      UI
//   ======================= */

//   return (
//     <div className="js-profile-page">
//       <h2 className="js-profile-title">My Profile</h2>

//       {/* PHOTO */}
//       <section className="js-profile-section">
//         <img
//           src={getFileUrl(jobSeeker.profilePhoto)}
//           className="js-profile-photo"
//         />
//         <input
//           type="file"
//           onChange={(e) => setProfilePhoto(e.target.files?.[0] || null)}
//         />
//         <button onClick={updateProfilePhoto} disabled={savingPhoto}>
//           Update Photo
//         </button>
//       </section>

//       {/* USER */}
//       <section className="js-profile-section">
//         <input value={name} onChange={(e) => setName(e.target.value)} />
//         <input value={email} onChange={(e) => setEmail(e.target.value)} />
//         <input value={mobile} onChange={(e) => setMobile(e.target.value)} />
//         <button onClick={updateUserInfo} disabled={savingUser}>
//           Save User
//         </button>
//       </section>

//       {/* BASIC */}
//       <section className="js-profile-section">
//         <select value={gender} onChange={(e) => setGender(e.target.value)}>
//           <option value="">Gender</option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//         </select>
//         <input
//           type="date"
//           value={dob}
//           onChange={(e) => setDob(e.target.value)}
//         />
//         <select value={status} onChange={(e) => setStatus(e.target.value)}>
//           <option value="">Status</option>
//           <option value="Fresher">Fresher</option>
//           <option value="Experienced">Experienced</option>
//         </select>
//         <button onClick={updateBasicInfo} disabled={savingBasic}>
//           Save Basic
//         </button>
//       </section>

//       {/* SKILLS */}
//       <section className="js-profile-section">
//         <input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} />
//         <button
//           onClick={() => {
//             if (newSkill) {
//               setSkills([...skills, newSkill]);
//               setNewSkill("");
//             }
//           }}
//         >
//           Add
//         </button>
//         {skills.map((s, i) => (
//           <div key={i}>
//             {s}
//             <button
//               onClick={() => setSkills(skills.filter((_, idx) => idx !== i))}
//             >
//               ✕
//             </button>
//           </div>
//         ))}
//         <button onClick={updateSkills} disabled={savingSkills}>
//           Save Skills
//         </button>
//       </section>

//       {/* EDUCATION */}
//       <section className="js-profile-section">
//         <h3>Education</h3>
//         {education.map((edu, i) => (
//           <div key={i}>
//             <input
//               value={edu.degree}
//               onChange={(e) => {
//                 const copy = [...education];
//                 copy[i].degree = e.target.value;
//                 setEducation(copy);
//               }}
//             />
//             <input
//               value={edu.institution}
//               onChange={(e) => {
//                 const copy = [...education];
//                 copy[i].institution = e.target.value;
//                 setEducation(copy);
//               }}
//             />
//             <button
//               onClick={() =>
//                 setEducation(education.filter((_, idx) => idx !== i))
//               }
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//         <button
//           onClick={() =>
//             setEducation([...education, { degree: "", institution: "" }])
//           }
//         >
//           Add
//         </button>
//         <button onClick={updateEducation} disabled={savingEducation}>
//           Save Education
//         </button>
//       </section>

//       {/* EXPERIENCE */}
//       {status === "Experienced" && (
//         <section className="js-profile-section">
//           <h3>Experience</h3>
//           {workExperience.map((exp, i) => (
//             <div key={i}>
//               <input
//                 value={exp.companyName}
//                 onChange={(e) => {
//                   const copy = [...workExperience];
//                   copy[i].companyName = e.target.value;
//                   setWorkExperience(copy);
//                 }}
//               />
//               <input
//                 value={exp.role}
//                 onChange={(e) => {
//                   const copy = [...workExperience];
//                   copy[i].role = e.target.value;
//                   setWorkExperience(copy);
//                 }}
//               />
//               <button
//                 onClick={() =>
//                   setWorkExperience(
//                     workExperience.filter((_, idx) => idx !== i)
//                   )
//                 }
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//           <button
//             onClick={() =>
//               setWorkExperience([
//                 ...workExperience,
//                 { companyName: "", role: "" },
//               ])
//             }
//           >
//             Add
//           </button>
//           <button onClick={updateExperience} disabled={savingExperience}>
//             Save Experience
//           </button>
//         </section>
//       )}

//       {/* RESUME */}
//       <section className="js-profile-section">
//         <a href={getFileUrl(jobSeeker.resume)} target="_blank">
//           View Resume
//         </a>
//         <input
//           type="file"
//           onChange={(e) => setResume(e.target.files?.[0] || null)}
//         />
//         <button onClick={updateResume} disabled={savingResume}>
//           Update Resume
//         </button>
//       </section>
//     </div>
//   );
// }

import { useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";

import UserInfoSection from "./user profile/UserInfoSection";
import BasicInfoSection from "./user profile/BasicInfoSection";
import SkillsSection from "./user profile/SkillsSection";
import EducationSection from "./user profile/EducationSection";
import ExperienceSection from "./user profile/ExperienceSection";
import ResumeSection from "./user profile/ResumeSection";
import ProfilePhotoSection from "./user profile/ProfilePhotoSection";

export default function UserProfile() {
  const auth = useContext(AuthContext);

  if (!auth || !auth.user || !auth.jobSeeker) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="js-profile-page">
      {/* <h2 className="js-profile-title">My Profile</h2> */}

      <div className="js-profile-container">
        <div className="js-profile-head">
          <ProfilePhotoSection />
          <UserInfoSection />
        </div>
        <BasicInfoSection />
        <ResumeSection />
        <SkillsSection />
        <ExperienceSection />
        <EducationSection />
      </div>
    </div>
  );
}
