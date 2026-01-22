import api from "./api";

export const applicationService = {
  applyJob,
  getJobSeekerAppliedJobs,
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
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
}

// get all jobs applies by that jobseeker
async function getJobSeekerAppliedJobs(jobSeekerId: string) {
  try {
    const response = await api.get(`/applications/jobseeker/${jobSeekerId}`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
}
