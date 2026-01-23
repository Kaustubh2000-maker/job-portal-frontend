import api from "./api";

export const companyUserService = {
  applyToCompany,
};

/* ===============================
   APPLY TO COMPANY (HR REQUEST)
   POST {{base_url}}/company-users/apply
================================ */
interface ApplyCompanyPayload {
  user: string;
  company: string;
}

async function applyToCompany(payload: ApplyCompanyPayload) {
  try {
    const response = await api.post("/company-users/apply", payload);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
}
