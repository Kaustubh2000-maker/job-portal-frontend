import api from "./api";

export const scheduleInterviewService = async (payload: {
  applicationId: string;
  scheduledAt: string;
  meetingLink: string;
}) => {
  const response = await api.post("/interviews/schedule", payload);
  return response.data;
};

// export const getCompanyInterviewsService = async (companyId: string) => {
//   const response = await api.get(`/interviews/company/${companyId}`);
//   return response.data;
// };

// export const getJobSeekerInterviewsService = async (jobSeekerId: string) => {
//   const response = await api.get(`/interviews/jobseeker/${jobSeekerId}`);
//   return response.data;
// };
