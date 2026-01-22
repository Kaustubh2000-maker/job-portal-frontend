import api from "./api";

export const companiesService = {
  getAllCompanies,
};

/* ===============================
   GET ALL COMPANIES
   GET {{base_url}}/companies
================================ */
async function getAllCompanies() {
  try {
    const response = await api.get("/companies");
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
}
