import { useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";

import UserInfoSection from "./user profile/UserInfoSection";
import BasicInfoSection from "./user profile/BasicInfoSection";
import SkillsSection from "./user profile/SkillsSection";
import EducationSection from "./user profile/EducationSection";
import ExperienceSection from "./user profile/ExperienceSection";
import ResumeSection from "./user profile/ResumeSection";
import ProfilePhotoSection from "./user profile/ProfilePhotoSection";

import { motion, AnimatePresence } from "framer-motion";

import {
  nrmlLeft,
  nrmlRight,
  nrmlScaleUp,
  nrmlVisible,
} from "../../animations/animations";

export default function UserProfile() {
  const auth = useContext(AuthContext);

  if (!auth || !auth.user || !auth.jobSeeker) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="js-profile-page">
      {/* <h2 className="js-profile-title">My Profile</h2> */}

      <div className="js-profile-container">
        <motion.div className="js-profile-head" {...nrmlVisible(0.2)}>
          <ProfilePhotoSection />
          <UserInfoSection />
        </motion.div>

        <motion.div {...nrmlVisible(0.3)}>
          <BasicInfoSection />
        </motion.div>

        <motion.div {...nrmlVisible(0.3)}>
          <ResumeSection />
        </motion.div>

        <motion.div {...nrmlVisible(0.3)}>
          <SkillsSection />
        </motion.div>

        <motion.div {...nrmlVisible(0.3)}>
          <ExperienceSection />
        </motion.div>

        <motion.div {...nrmlVisible(0.3)}>
          <EducationSection />
        </motion.div>
      </div>
    </div>
  );
}
