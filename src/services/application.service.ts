import api from "./api";

export const applicationService = {
  applyJob,
  getJobSeekerAppliedJobs,
  getApplicationsByJob,
  updateApplicationStatus,
};

interface ApplyJobPayload {
  jobId: string;
  jobSeekerId: string;
  applyType: "APPLY_NOW" | "APPLY_WITH_NEW_RESUME";
  resume?: File;
}

async function applyJob(payload: ApplyJobPayload) {
  try {
    const formData = new FormData();

    formData.append("jobId", payload.jobId);
    formData.append("jobSeekerId", payload.jobSeekerId);
    formData.append("applyType", payload.applyType);

    if (payload.applyType === "APPLY_WITH_NEW_RESUME" && payload.resume) {
      formData.append("resume", payload.resume);
    }

    const response = await api.post("/applications", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
}

async function getJobSeekerAppliedJobs(jobSeekerId: string) {
  try {
    const response = await api.get(`/applications/jobseeker/${jobSeekerId}`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
}

async function getApplicationsByJob(jobId: string) {
  try {
    const response = await api.get(`/applications/job/${jobId}`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
}

async function updateApplicationStatus(
  applicationId: string,
  payload: {
    status: "APPROVED" | "REJECTED";
    actionBy: string;
  }
) {
  try {
    const response = await api.patch(`/applications/${applicationId}`, payload);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
}
