import api from "./api";

export const jobService = {
  getAllJobs,
};

async function getAllJobs() {
  try {
    const response = await api.get("/jobs");
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
}
