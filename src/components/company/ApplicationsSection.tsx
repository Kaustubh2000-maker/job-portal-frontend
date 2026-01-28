import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { applicationService } from "../../services/application.service";
import { jobService } from "../../services/job.service";
// import { interviewService } from "../../services/interview.service";
import { useAuth } from "../../auth/useAuth";
import { getFileUrl } from "../../utils/fileUrl";
import { scheduleInterviewService } from "../../services/interview.service";

interface Education {
  _id: string;
  degree: string;
  institution: string;
}

interface WorkExperience {
  _id: string;
  companyName: string;
  role: string;
}

interface ProfileSnapshot {
  name?: string;
  email?: string;
  mobile?: string;
  education?: Education[];
  workExperience?: WorkExperience[];
  skills?: string[];
}

interface Application {
  _id: string;
  profileSnapshot?: ProfileSnapshot;
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

  const [interviewFor, setInterviewFor] = useState<string | null>(null);
  const [scheduledAt, setScheduledAt] = useState("");
  const [meetingLink, setMeetingLink] = useState("");

  useEffect(() => {
    setSelectedJobId(jobId);
  }, [jobId]);

  useEffect(() => {
    if (company && user) fetchCompanyJobs();
  }, [company, user]);

  useEffect(() => {
    if (selectedJobId) fetchApplications(selectedJobId);
  }, [selectedJobId]);

  const fetchCompanyJobs = async () => {
    const res = await jobService.getJobsByCompany(company!._id, user!._id);
    setJobs(res.data.jobs);
  };

  const fetchApplications = async (jobId: string) => {
    setLoading(true);
    const res = await applicationService.getApplicationsByJob(jobId);
    setApplications(res.data.applications);
    setLoading(false);
  };

  const approveApplication = async (applicationId: string) => {
    await applicationService.updateApplicationStatus(applicationId, {
      status: "APPROVED",
      actionBy: user!._id,
    });
    toast.success("Application approved");
    setInterviewFor(applicationId);
    fetchApplications(selectedJobId!);
  };

  const rejectApplication = async (applicationId: string) => {
    await applicationService.updateApplicationStatus(applicationId, {
      status: "REJECTED",
      actionBy: user!._id,
    });
    toast.success("Application rejected");
    fetchApplications(selectedJobId!);
  };

  const scheduleInterview = async () => {
    if (!interviewFor || !scheduledAt || !meetingLink) {
      toast.error("All fields required");
      return;
    }

    try {
      await scheduleInterviewService({
        applicationId: interviewFor,
        scheduledAt,
        meetingLink,
      });

      toast.success("Interview scheduled & email sent");

      setInterviewFor(null);
      setScheduledAt("");
      setMeetingLink("");

      fetchApplications(selectedJobId!);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to schedule interview"
      );
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
        <option value=""> Select Opening</option>
        {jobs.map((job) => (
          <option key={job._id} value={job._id}>
            {job.title}
          </option>
        ))}
      </select>

      {loading && (
        <p className="company-dash-a-loading">Loading applications...</p>
      )}

      {applications.map((app) => {
        const p = app.profileSnapshot;

        return (
          <div key={app._id} className="company-dash-a-card">
            <div className="company-dash-a-info">
              <div className="company-dash-a-header">
                <h4 className="company-dash-a-name">
                  {p?.name || "Candidate"}
                </h4>
                <span
                  className={`company-dash-a-status ${app.status.toLowerCase()}`}
                >
                  {app.status}
                </span>
              </div>

              {p?.email && <p className="company-dash-a-email">{p.email}</p>}
              {p?.mobile && <p className="company-dash-a-mobile">{p.mobile}</p>}

              {p?.skills?.length ? (
                <div className="company-dash-a-skills">
                  {p.skills.map((s, i) => (
                    <span key={i} className="company-dash-a-skill-chip">
                      {s}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="company-dash-a-exp">
                <strong>Experience</strong>

                {p?.workExperience && p.workExperience.length > 0 ? (
                  p.workExperience.map((e) => (
                    <p key={e._id}>
                      {e.role} @ {e.companyName}
                    </p>
                  ))
                ) : (
                  <p>Fresher</p>
                )}
              </div>

              <a
                className="company-dash-a-resume"
                href={getFileUrl(app.resumeLink)}
                target="_blank"
                rel="noreferrer"
              >
                View Resume
              </a>
            </div>

            {app.status === "PENDING" && (
              <div className="company-dash-a-actions">
                <button
                  className="company-dash-a-approve"
                  onClick={() => approveApplication(app._id)}
                >
                  Approve
                </button>
                <button
                  className="company-dash-a-reject"
                  onClick={() => rejectApplication(app._id)}
                >
                  Reject
                </button>
              </div>
            )}

            {interviewFor === app._id && (
              <div className="company-dash-a-interview">
                <h4 className="company-dash-a-i-heading">Schedule Interview</h4>

                <div className="company-dash-a-i-box">
                  <label className="company-dash-a-i-label">
                    Interview Date & Time
                  </label>
                  <input
                    className="company-dash-a-i-input"
                    type="datetime-local"
                    value={scheduledAt}
                    onChange={(e) => setScheduledAt(e.target.value)}
                  />
                </div>

                <div className="company-dash-a-i-box">
                  <label className="company-dash-a-i-label">Meeting Link</label>
                  <input
                    className="company-dash-a-i-input"
                    placeholder="https://meet.google.com/xxx-xxxx-xxx"
                    value={meetingLink}
                    onChange={(e) => setMeetingLink(e.target.value)}
                  />
                </div>

                <button
                  className="company-dash-a-i-btn"
                  onClick={scheduleInterview}
                >
                  Schedule Interview
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
