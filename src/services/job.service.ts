import api from "./api";

export const jobService = {
  getAllJobs,
  getJobsByCompany,
  createJob,
  closeJob,
};

async function getAllJobs() {
  try {
    const response = await api.get("/jobs");
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
}

async function getJobsByCompany(companyId: string, requestedBy: string) {
  try {
    const response = await api.get(`/jobs/company/${companyId}`, {
      params: { requestedBy },
    });

    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
}

interface CreateJobPayload {
  company: string;
  createdBy: string;
  title: string;
  description: string;
  location: string;
  employmentType?: string;
  experienceLevel?: string;
  skills?: string[];
  salaryRange?: {
    min: number;
    max: number;
  };
}

async function createJob(payload: CreateJobPayload) {
  try {
    const response = await api.post("/jobs", payload);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
}

async function closeJob(jobId: string, closedBy: string) {
  try {
    const response = await api.patch(`/jobs/${jobId}/close`, {
      closedBy,
    });

    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
}
