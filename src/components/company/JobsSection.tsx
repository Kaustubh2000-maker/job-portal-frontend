import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../auth/useAuth";
import { jobService } from "../../services/job.service";

interface Job {
  _id: string;
  title: string;
  location: string;
  status?: "OPEN" | "CLOSED";
}

export default function JobsSection({
  onSelectJob,
}: {
  onSelectJob: (jobId: string) => void;
}) {
  const { company, user } = useAuth();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  // job form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [employmentType, setEmploymentType] = useState("FULL_TIME");
  const [experienceLevel, setExperienceLevel] = useState("JUNIOR");
  const [skills, setSkills] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");

  useEffect(() => {
    if (company && user) {
      fetchJobs();
    }
  }, [company, user]);

  /* =========================
     FETCH JOBS
  ========================= */
  const fetchJobs = async () => {
    try {
      const res = await jobService.getJobsByCompany(company!._id, user!._id);
      setJobs(res.data.jobs);
    } catch {
      toast.error("Failed to load jobs");
    }
  };

  /* =========================
     CREATE JOB
  ========================= */
  const createJob = async () => {
    if (!title || !description || !location) {
      toast.error("Title, description and location are required");
      return;
    }

    try {
      setLoading(true);

      await jobService.createJob({
        title,
        description,
        location,
        employmentType,
        experienceLevel,
        skills: skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        salaryRange: {
          min: Number(salaryMin),
          max: Number(salaryMax),
        },
        company: company!._id,
        createdBy: user!._id,
      });

      toast.success("Job created");

      // reset form
      setTitle("");
      setDescription("");
      setLocation("");
      setSkills("");
      setSalaryMin("");
      setSalaryMax("");

      fetchJobs();
    } catch {
      toast.error("Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     CLOSE JOB
  ========================= */
  const closeJob = async (jobId: string) => {
    try {
      await jobService.closeJob(jobId, user!._id);
      toast.success("Job closed");
      fetchJobs();
    } catch {
      toast.error("Failed to close job");
    }
  };

  return (
    <div className="js-company-section js-company-jobs">
      {/* CREATE JOB FORM */}
      <div className="company-dash-j-create">
        <div className="company-dash-j-grid company-dash-j-grid-2">
          <div className="company-dash-j-field">
            <label className="company-dash-j-label">Job Title</label>
            <input
              className="company-dash-j-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="company-dash-j-field">
            <label className="company-dash-j-label">Location</label>
            <input
              className="company-dash-j-input"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        <div className="company-dash-j-field">
          <label className="company-dash-j-label">Job Description</label>
          <textarea
            className="company-dash-j-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="company-dash-j-grid company-dash-j-grid-3">
          <div className="company-dash-j-field">
            <label className="company-dash-j-label">Employment Type</label>
            <select
              className="company-dash-j-input"
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value)}
            >
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
              <option value="INTERNSHIP">Internship</option>
              <option value="CONTRACT">Contract</option>
            </select>
          </div>

          <div className="company-dash-j-field">
            <label className="company-dash-j-label">Experience Level</label>
            <select
              className="company-dash-j-input"
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
            >
              <option value="FRESHER">Fresher</option>
              <option value="JUNIOR">Junior</option>
              <option value="MID">Mid</option>
              <option value="SENIOR">Senior</option>
            </select>
          </div>

          <div className="company-dash-j-field">
            <label className="company-dash-j-label">Skills</label>
            <input
              className="company-dash-j-input"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="java, spring boot"
            />
          </div>
        </div>

        <div className="company-dash-j-grid company-dash-j-grid-2">
          <div className="company-dash-j-field">
            <label className="company-dash-j-label">Salary Min</label>
            <input
              type="number"
              className="company-dash-j-input"
              value={salaryMin}
              onChange={(e) => setSalaryMin(e.target.value)}
            />
          </div>

          <div className="company-dash-j-field">
            <label className="company-dash-j-label">Salary Max</label>
            <input
              type="number"
              className="company-dash-j-input"
              value={salaryMax}
              onChange={(e) => setSalaryMax(e.target.value)}
            />
          </div>
        </div>

        <button
          className="company-dash-j-submit-btn"
          onClick={createJob}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Job"}
        </button>
      </div>

      {/* JOB CARDS */}
      {jobs.length === 0 && <p>No jobs created yet</p>}

      {jobs.map((job) => (
        <div key={job._id} className="company-dash-j-card">
          <div className="company-dash-j-card-info">
            <strong>{job.title}</strong>
            <p>{job.location}</p>
            <p>Status: {job.status || "OPEN"}</p>
          </div>

          <div className="company-dash-j-card-actions">
            <button onClick={() => onSelectJob(job._id)}>
              View Applications
            </button>

            {job.status !== "CLOSED" && (
              <button onClick={() => closeJob(job._id)}>Close Job</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
