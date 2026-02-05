import { useEffect, useState, useContext, useRef } from "react";
import { jobService } from "../../services/job.service";
import { applicationService } from "../../services/application.service";
import { AuthContext } from "../../context/auth/AuthContext";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

import {
  nrmlLeft,
  nrmlRight,
  nrmlScaleUp,
  nrmlVisible,
} from "../../animations/animations";
interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  employmentType: string;
  experienceLevel: string;
  status: string;
  skills: string[];
  salaryRange: {
    min: number;
    max: number;
  };
  company: {
    _id: string;
    name: string;
    location: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  const auth = useContext(AuthContext);
  const jobSeekerId = auth?.jobSeeker?._id;

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const location = useLocation();
  const selectedJobId = location.state?.selectedJobId;

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await jobService.getAllJobs();
      const jobsData = res?.data?.jobs || [];
      setJobs(jobsData);
      // setSelectedJob(jobsData[0] || null);
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!jobs.length) return;

    if (selectedJobId) {
      const foundJob = jobs.find((job) => job._id === selectedJobId);
      setSelectedJob(foundJob || jobs[0]);
    } else {
      setSelectedJob(jobs[0]);
    }
  }, [jobs, selectedJobId]);

  const handleApplyNow = async () => {
    if (!selectedJob || !jobSeekerId) {
      toast.error("Jobseeker profile not loaded");
      return;
    }

    try {
      setApplying(true);

      await applicationService.applyJob({
        jobId: selectedJob._id,
        jobSeekerId,
        applyType: "APPLY_NOW",
      });

      toast.success("Job applied successfully!");
    } catch (error) {
      toast.error("Already applied to this job");
    } finally {
      setApplying(false);
    }
  };

  const handleResumeSelected = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file || !selectedJob || !jobSeekerId) return;

    try {
      setApplying(true);

      await applicationService.applyJob({
        jobId: selectedJob._id,
        jobSeekerId,
        applyType: "APPLY_WITH_NEW_RESUME",
        resume: file,
      });

      toast.success("Job applied successfully!");
    } catch (error) {
      toast.error("Already applied to this job");
    } finally {
      setApplying(false);
      e.target.value = ""; // reset input
    }
  };

  if (loading) {
    return (
      <div className="loading-div">
        <p className="loading-text">Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="js-jobs-page">
      <div className="js-jobs-container">
        <div className="js-jobs-flex">
          {jobs.map((job, index) => (
            <motion.div
              {...nrmlVisible(0.1 * index)}
              key={job._id}
              className={`js-jobs-list ${
                selectedJob?._id === job._id ? "job-card--active" : ""
              }`}
              onClick={() => setSelectedJob(job)}
            >
              <h4 className="js-jobs-list-heading">{job.title}</h4>
              <p className="js-jobs-list-locaion">{job.location}</p>
              <p className="js-jobs-list-company-name">{job.company.name}</p>
            </motion.div>
          ))}
        </div>

        <motion.div className="js-job-detail-div " {...nrmlVisible(0.2)}>
          {selectedJob ? (
            <>
              <h2 className="js-job-detail-title">{selectedJob.title}</h2>

              <p className="js-job-detail-text">
                Company : {selectedJob.company.name}
              </p>

              <p className="js-job-detail-text">
                Location : {selectedJob.location}
              </p>

              <p className="js-job-detail-text">
                Experience : {selectedJob.experienceLevel}
              </p>

              <p className="js-job-detail-text">
                Employment : {selectedJob.employmentType}
              </p>

              <p className="js-job-detail-text">
                Salary: ₹{selectedJob.salaryRange.min} – ₹
                {selectedJob.salaryRange.max}
              </p>

              <div className="js-job-detail-skills">
                <p className="js-job-detail-skills-title">Skills Required :</p>
                <ul className="js-job-detail-skill-list">
                  {selectedJob.skills.map((skill) => (
                    <li key={skill} className="js-job-detail-skill-item">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="js-job-detail-description">
                <h3 className="js-job-detail-description-title">
                  Description:
                </h3>
                <p className="js-job-detail-description-text">
                  {selectedJob.description}
                </p>
              </div>

              <div className="js-job-detail-apply-div">
                <h3 className="js-job-detail-apply-title">
                  Apply for this job
                </h3>

                <div className="js-job-apply-btn-div">
                  <button
                    onClick={handleApplyNow}
                    disabled={applying}
                    className="js-job-detail-apply-button"
                  >
                    {applying ? "Applying..." : "Apply Now"}
                  </button>

                  <button
                    type="button"
                    disabled={applying}
                    className="js-job-detail-apply-button js-job-detail-apply-secondary"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Apply with New Resume
                  </button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  style={{ display: "none" }}
                  onChange={handleResumeSelected}
                />
              </div>
            </>
          ) : (
            <p className="js-job-detail-empty">No job available now</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
