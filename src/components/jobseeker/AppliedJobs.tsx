import { useEffect, useState, useContext } from "react";
import { applicationService } from "../../services/application.service";
import { AuthContext } from "../../context/auth/AuthContext";

interface Application {
  _id: string;
  applyType: "APPLY_NOW" | "APPLY_WITH_NEW_RESUME";
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  createdAt: string;
  job: {
    _id: string;
    title: string;
    location: string;
  };
}

import { motion, AnimatePresence } from "framer-motion";

import {
  nrmlLeft,
  nrmlRight,
  nrmlScaleUp,
  nrmlVisible,
} from "../../animations/animations";

export default function AppliedJobs() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ GET jobSeeker from global auth context
  const auth = useContext(AuthContext);
  const jobSeekerId = auth?.jobSeeker?._id;

  useEffect(() => {
    if (jobSeekerId) {
      fetchAppliedJobs(jobSeekerId);
    }
  }, [jobSeekerId]);

  const fetchAppliedJobs = async (jobSeekerId: string) => {
    try {
      const res = await applicationService.getJobSeekerAppliedJobs(jobSeekerId);

      const data = res?.data?.applications || [];
      setApplications(data);
    } catch (error) {
      console.error("Failed to fetch applied jobs", error);
    } finally {
      setLoading(false);
    }
  };

  if (!jobSeekerId) {
    return (
      <div className="loading-div">
        <p className="loading-text">Loading profile...</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading-div">
        <p className="loading-text"> Loading jobs...</p>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="loading-div">
        <p className="loading-text">No applied jobs found.</p>;
      </div>
    );
  }

  return (
    <div className="js-aj-page">
      <div className="js-aj-container">
        <h2 className="js-aj-title">Applied Jobs</h2>

        <div className="js-aj-cards-grid">
          {applications.map((app, index) => (
            <motion.div
              key={app._id}
              className="js-aj-card"
              {...nrmlVisible(0.1 * index)}
            >
              <h3 className="js-aj-card-title">{app.job.title}</h3>

              <p className="js-aj-card-location">
                Location : {app.job.location}
              </p>
              {/* 
            <p className="js-aj-card-applytype">
              Apply Type:{" "}
              {app.applyType === "APPLY_NOW"
                ? "Apply Now"
                : "Apply with New Resume"}
            </p> */}

              <p className={`js-aj-card-status`}>
                Status :{" "}
                <span
                  className={`js-aj-card-status js-aj-card-status--${app.status.toLowerCase()}`}
                >
                  {app.status}
                </span>
              </p>

              <p className="js-aj-card-date">
                Applied On : {new Date(app.createdAt).toLocaleDateString()}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
