import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { applicationService } from "../../services/application.service";
import { jobService } from "../../services/job.service";
import { useAuth } from "../../auth/useAuth";
import { getFileUrl } from "../../utils/fileUrl";

interface Education {
  _id: string;
  degree: string;
  institution: string;
}

interface WorkExperience {
  _id: string;
  companyName: string;
  role: string;
  isCurrent: boolean;
}

interface ProfileSnapshot {
  name: string;
  email: string;
  mobile: string;
  education?: Education[];
  workExperience?: WorkExperience[];
  skills?: string[];
}

interface Application {
  _id: string;
  profileSnapshot: ProfileSnapshot;
  resumeLink: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

interface Job {
  _id: string;
  title: string;
}

export default function ApplicationsSection({
  jobId,
}: {
  jobId: string | null;
}) {
  const { user, company } = useAuth();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(jobId);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);

  // sync jobId from JobsSection
  useEffect(() => {
    setSelectedJobId(jobId);
  }, [jobId]);

  // fetch company jobs
  useEffect(() => {
    if (company && user) {
      fetchCompanyJobs();
    }
  }, [company, user]);

  // fetch applications
  useEffect(() => {
    if (selectedJobId) {
      fetchApplications(selectedJobId);
    }
  }, [selectedJobId]);

  const fetchCompanyJobs = async () => {
    try {
      const res = await jobService.getJobsByCompany(company!._id, user!._id);
      setJobs(res.data.jobs);
    } catch {
      toast.error("Failed to load jobs");
    }
  };

  const fetchApplications = async (jobId: string) => {
    try {
      setLoading(true);
      const res = await applicationService.getApplicationsByJob(jobId);
      setApplications(res.data.applications);
    } catch {
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (
    applicationId: string,
    status: "APPROVED" | "REJECTED"
  ) => {
    try {
      await applicationService.updateApplicationStatus(applicationId, {
        status,
        actionBy: user!._id,
      });

      toast.success(`Application ${status.toLowerCase()}`);
      fetchApplications(selectedJobId!);
    } catch {
      console.log(console.error);

      toast.error("Failed to update application");
    }
  };

  return (
    <div className="js-company-section js-company-applications">
      <h3 className="company-dash-a-heading">Applications</h3>

      <select
        className="company-dash-a-select"
        value={selectedJobId || ""}
        onChange={(e) => setSelectedJobId(e.target.value)}
      >
        {/* <option value="">Select a job</option> */}
        {jobs.map((job) => (
          <option key={job._id} value={job._id}>
            {job.title}
          </option>
        ))}
      </select>

      {!selectedJobId && (
        <p className="company-dash-select-status">
          {" "}
          Select a job to view applications
        </p>
      )}

      {loading && <p>Loading applications...</p>}

      {!loading && selectedJobId && applications.length === 0 && (
        <p>No applications yet</p>
      )}

      {applications.map((app) => {
        const profile = app.profileSnapshot;
        const hasExperience =
          profile.workExperience && profile.workExperience.length > 0;

        return (
          <div key={app._id} className="company-dash-a-card">
            <div className="company-dash-a-info">
              <div className="company-dash-a-header">
                <h4 className="company-dash-a-name">{profile.name}</h4>
                <span
                  className={`company-dash-a-status ${app.status.toLowerCase()}`}
                >
                  {app.status}
                </span>
              </div>

              <p className="company-dash-a-email">{profile.email}</p>
              <p className="company-dash-a-mobile">{profile.mobile}</p>

              {profile.skills && profile.skills.length > 0 && (
                <div className="company-dash-a-skills">
                  {profile.skills.map((skill, i) => (
                    <span key={i} className="company-dash-a-skill-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {hasExperience && (
                <div className="company-dash-a-exp">
                  <strong>Experience</strong>
                  {profile.workExperience!.map((exp) => (
                    <p key={exp._id}>
                      {exp.role} @ {exp.companyName}
                    </p>
                  ))}
                </div>
              )}

              {profile.education && profile.education.length > 0 && (
                <div className="company-dash-a-edu">
                  <strong>Education</strong>
                  {profile.education.map((edu) => (
                    <p key={edu._id}>
                      {edu.degree} – {edu.institution}
                    </p>
                  ))}
                </div>
              )}

              <a
                className="company-dash-a-resume"
                href={getFileUrl(app.resumeLink)}
                target="_blank"
                rel="noreferrer"
              >
                View Resume
              </a>
            </div>

            {/* ACTIONS */}
            {app.status === "PENDING" && (
              <div className="company-dash-a-actions">
                <button
                  className="company-dash-a-approve"
                  onClick={() => updateStatus(app._id, "APPROVED")}
                >
                  Approve
                </button>
                <button
                  className="company-dash-a-reject"
                  onClick={() => updateStatus(app._id, "REJECTED")}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
