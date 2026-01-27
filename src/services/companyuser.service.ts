import api from "./api";

export const companyUserService = {
  applyToCompany,
  checkMyCompanyStatus,
  approveOrRejectUser,
  getPendingCompanyUsers,
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

async function checkMyCompanyStatus() {
  const res = await api.get("/company-users/check");
  return res.data;
}

async function approveOrRejectUser(
  companyUserId: string,
  payload: {
    status: "APPROVED" | "REJECTED";
    actionBy: string;
  }
) {
  try {
    const response = await api.patch(
      `/company-users/${companyUserId}`,
      payload
    );

    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
}

async function getPendingCompanyUsers(companyId: string) {
  try {
    const response = await api.get(`/company-users/pending/${companyId}`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
}
