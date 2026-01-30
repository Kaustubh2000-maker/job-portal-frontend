import api from "./api";

export const companiesService = {
  getAllCompanies,
  createCompany,
  getAllCompaniesForAdmin,
  exportCompaniesExcel,
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

interface GetAdminCompaniesParams {
  search?: string;
  industry?: string;
  location?: string;
  isActive?: boolean | string;
  createdAfter?: string;
}

async function getAllCompaniesForAdmin(params?: GetAdminCompaniesParams) {
  try {
    const response = await api.get("/companies/admin", {
      params,
    });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
}

// async function exportCompaniesExcel(params?: GetAdminCompaniesParams) {
//   try {
//     const response = await api.get("/companies/admin/export", {
//       params,
//       responseType: "blob",
//     });
//     return response;
//   } catch (error: any) {
//     throw error?.response?.data || error;
//   }
// }

async function exportCompaniesExcel(params?: any) {
  try {
    const response = await api.get("/companies/admin/export", {
      params,
      responseType: "blob",
    });

    return response;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
}
