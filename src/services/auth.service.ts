import api from "./api";

export const loginService = async (payload: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/users/login", payload);
  return response.data;
};

export const signupService = async (payload: {
  name: string;
  email: string;
  mobile: string;
  password: string;
  passwordConfirm: string;
  role: "COMPANY" | "JOBSEEKER";
}) => {
  const response = await api.post("/users/signup", payload);
  return response.data;
};

export const forgotPasswordService = async (payload: { email: string }) => {
  const response = await api.post("/auth/forgot-Password", payload);
  return response.data;
};

export const resetPasswordService = async (
  token: string,
  payload: {
    password: string;
    passwordConfirm: string;
  }
) => {
  const response = await api.patch(`/auth/reset-Password/${token}`, payload);
  return response.data;
};
