import { useEffect, useState, useContext } from "react";
import { jobService } from "../../services/job.service";
import { applicationService } from "../../services/application.service";
import { AuthContext } from "../../auth/AuthContext";
import { toast } from "react-toastify";

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

type ApplyType = "APPLY_NOW" | "APPLY_WITH_NEW_RESUME";

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  // apply states
  const [applyType, setApplyType] = useState<ApplyType>("APPLY_NOW");
  const [resume, setResume] = useState<File | null>(null);

  const [applying, setApplying] = useState(false);
  const auth = useContext(AuthContext);
  const jobSeekerId = auth?.jobSeeker?._id;

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await jobService.getAllJobs();
      const jobsData = res?.data?.jobs || [];

      setJobs(jobsData);
      setSelectedJob(jobsData[0] || null);
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!selectedJob) return;

    // ✅ GUARD (this fixes TS + runtime safety)
    if (!jobSeekerId) {
      alert("Jobseeker profile not loaded yet");
      return;
    }

    if (applyType === "APPLY_WITH_NEW_RESUME" && !resume) {
      alert("Please upload a resume");
      return;
    }

    try {
      setApplying(true);

      await applicationService.applyJob({
        jobId: selectedJob._id,
        jobSeekerId, // ✅ now TS knows it's string
        applyType,
        resume: resume || undefined,
      });

      // alert("Job applied successfully!");
      toast.success("Job applied successfully!");

      setApplyType("APPLY_NOW");
      setResume(null);
    } catch (error) {
      console.error(error);
      toast.error("Alredy applied to this job");
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-div">
        <p className="loading-text"> Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="js-jobs-page">
      <div className="js-jobs-container">
        {/* LEFT: JOB LIST */}
        <div className="js-jobs-flex">
          {jobs.map((job) => (
            <div
              key={job._id}
              className={`js-jobs-list ${
                selectedJob?._id === job._id ? "job-card--active" : ""
              }`}
              onClick={() => setSelectedJob(job)}
            >
              <h4 className="js-jobs-list-heading">{job.title}</h4>
              <p className="js-jobs-list-locaion">{job.location}</p>
              <p className="js-jobs-list-company-name">{job.company.name}</p>
            </div>
          ))}
        </div>

        {/* RIGHT: JOB DETAILS */}
        <div className="js-job-detail-div">
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
                <p className="js-job-detail-skills-title">Skills Required : </p>
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

              {/* APPLY SECTION */}

              <div className="js-job-detail-apply-div">
                <h3 className="js-job-detail-apply-title">
                  Apply for this job
                </h3>
                <div className="js-job-detail-apply-option-div">
                  <label className="js-job-detail-apply-option">
                    <input
                      type="radio"
                      checked={applyType === "APPLY_NOW"}
                      onChange={() => setApplyType("APPLY_NOW")}
                      className="js-job-detail-apply-radio"
                    />
                    Apply Now
                  </label>
                </div>
                <div className="js-job-detail-apply-option-div">
                  <label className="js-job-detail-apply-option">
                    <input
                      type="radio"
                      checked={applyType === "APPLY_WITH_NEW_RESUME"}
                      onChange={() => setApplyType("APPLY_WITH_NEW_RESUME")}
                      className="js-job-detail-apply-radio"
                    />
                    Apply with New Resume
                  </label>
                </div>

                {applyType === "APPLY_WITH_NEW_RESUME" && (
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) =>
                      setResume(e.target.files ? e.target.files[0] : null)
                    }
                    className="js-job-detail-apply-file"
                  />
                )}
                <button
                  onClick={handleApply}
                  disabled={applying}
                  className="js-job-detail-apply-button"
                >
                  {applying ? "Applying..." : "Apply"}
                </button>
              </div>
            </>
          ) : (
            <p className="js-job-detail-empty">Select a job to view details</p>
          )}
        </div>
      </div>
    </div>
  );
}
