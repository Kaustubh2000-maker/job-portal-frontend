import api from "./api";

export const scheduleInterviewService = async (payload: {
  applicationId: string;
  scheduledAt: string;
  meetingLink: string;
}) => {
  const response = await api.post("/interviews/schedule", payload);
  return response.data;
};
