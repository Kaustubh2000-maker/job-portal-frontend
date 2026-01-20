import api from "./api";
// 🔐 LOGIN
export const loginService = async (payload: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/users/login", payload);
  return response.data;
};

// 📝 SIGN UP (Company / Jobseeker only)
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
