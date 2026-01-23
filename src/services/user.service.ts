import api from "./api";

export const userService = {
  updateMe,
  deactivateMe,
};

interface UpdateMePayload {
  name?: string;
  email?: string;
  mobile?: string;
}

async function updateMe(payload: UpdateMePayload) {
  try {
    const response = await api.patch("/users/updateMe", payload);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
}

async function deactivateMe() {
  try {
    const response = await api.patch("/users/deactivateMe");
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
}
