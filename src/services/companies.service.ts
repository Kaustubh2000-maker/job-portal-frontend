import api from "./api";

export const companiesService = {
  getAllCompanies,
  createCompany,
};

async function getAllCompanies() {
  try {
    const response = await api.get("/companies");
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
}

interface CreateCompanyPayload {
  name: string;
  industry: string;
  website: string;
  description: string;
  location: string;
  createdBy: string;
}

async function createCompany(payload: CreateCompanyPayload) {
  try {
    const response = await api.post("/companies", payload);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
}
